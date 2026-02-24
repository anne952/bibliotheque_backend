import { Router } from "express";
import { asyncHandler, AppError } from "../../common/http";
import { authMiddleware } from "../../common/auth.middleware";
import { AuthService } from "./auth.service";

export const authRoutes = Router();

// Registration status (for first-install bootstrap flow)
authRoutes.get(
  "/register-status",
  asyncHandler(async (_req, res) => {
    const status = await AuthService.getRegistrationStatus();
    res.status(200).json(status);
  }),
);

// Register
authRoutes.post(
  "/register",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      email?: string;
      password?: string;
      companyName?: string;
    };

    if (!body.email) throw new AppError("email obligatoire", 400);
    if (!body.password) throw new AppError("password obligatoire", 400);
    if (body.password.length < 8) {
      throw new AppError("password doit contenir au moins 8  caracteres", 400);
    }

    const user = await AuthService.register({
      email: body.email,
      password: body.password,
      companyName: body.companyName,
    });

    res.status(201).json(user);
  }),
);

// Login
authRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      email?: string;
      password?: string;
    };

    if (!body.email) throw new AppError("email obligatoire", 400);
    if (!body.password) throw new AppError("password obligatoire", 400);

    const result = await AuthService.login({
      email: body.email,
      password: body.password,
    });

    res.status(200).json(result);
  }),
);

// Refresh token
authRoutes.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const body = req.body as { refreshToken?: string };

    if (!body.refreshToken) {
      throw new AppError("refreshToken obligatoire", 400);
    }

    const result = await AuthService.refreshSession(body.refreshToken);
    res.status(200).json(result);
  }),
);

// Logout
authRoutes.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const body = req.body as { refreshToken?: string };

    if (!body.refreshToken) {
      throw new AppError("refreshToken obligatoire", 400);
    }

    await AuthService.logout(body.refreshToken);
    res.status(200).json({ message: "Logout réussi" });
  }),
);

// Get profile (protégé)
authRoutes.get(
  "/profile",
  authMiddleware,
  asyncHandler(async (req, res) => {
    if (!req.userId) throw new AppError("Utilisateur non identifié", 401);

    const profile = await AuthService.getProfile(req.userId);
    res.status(200).json(profile);
  }),
);

// Update profile (protégé)
authRoutes.put(
  "/profile",
  authMiddleware,
  asyncHandler(async (req, res) => {
    if (!req.userId) throw new AppError("Utilisateur non identifié", 401);

    const body = req.body as {
      companyName?: string;
      profilePicture?: string;
    };

    const updated = await AuthService.updateProfile(req.userId, body);
    res.status(200).json(updated);
  }),
);
