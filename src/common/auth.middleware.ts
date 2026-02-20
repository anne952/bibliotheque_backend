import { Request, Response, NextFunction } from "express";
import { AppError } from "./http";
import { prisma } from "../config/prisma";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Token d'authentification manquant", 401);
    }

    const refreshToken = authHeader.substring(7);

    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    const now = new Date();
    if (
      !session ||
      (session.revokedAt !== null && session.revokedAt <= now) ||
      session.expiresAt < now
    ) {
      throw new AppError("Token invalide ou expire", 401);
    }

    if (!session.user.isActive) {
      throw new AppError("Utilisateur inactif", 403);
    }

    req.userId = session.user.id;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("Erreur d'authentification", 401));
    }
  }
}
