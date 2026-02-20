"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const http_1 = require("./http");
const prisma_1 = require("../config/prisma");
async function authMiddleware(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new http_1.AppError("Token d'authentification manquant", 401);
        }
        const refreshToken = authHeader.substring(7);
        const session = await prisma_1.prisma.session.findUnique({
            where: { refreshToken },
            include: { user: true },
        });
        if (!session || session.revokedAt || session.expiresAt < new Date()) {
            throw new http_1.AppError("Token invalide ou expire", 401);
        }
        if (!session.user.isActive) {
            throw new http_1.AppError("Utilisateur inactif", 403);
        }
        req.userId = session.user.id;
        next();
    }
    catch (error) {
        if (error instanceof http_1.AppError) {
            next(error);
        }
        else {
            next(new http_1.AppError("Erreur d'authentification", 401));
        }
    }
}
//# sourceMappingURL=auth.middleware.js.map