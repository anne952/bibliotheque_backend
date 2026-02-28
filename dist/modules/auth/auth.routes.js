"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const http_1 = require("../../common/http");
const auth_middleware_1 = require("../../common/auth.middleware");
const auth_service_1 = require("./auth.service");
exports.authRoutes = (0, express_1.Router)();
// Registration status (for first-install bootstrap flow)
exports.authRoutes.get("/register-status", (0, http_1.asyncHandler)(async (_req, res) => {
    const status = await auth_service_1.AuthService.getRegistrationStatus();
    res.status(200).json(status);
}));
// Register
exports.authRoutes.post("/register", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.email)
        throw new http_1.AppError("email obligatoire", 400);
    if (!body.password)
        throw new http_1.AppError("password obligatoire", 400);
    if (body.password.length < 8) {
        throw new http_1.AppError("password doit contenir au moins 8  caracteres", 400);
    }
    const user = await auth_service_1.AuthService.register({
        email: body.email,
        password: body.password,
        companyName: body.companyName,
    });
    res.status(201).json(user);
}));
// Login
exports.authRoutes.post("/login", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.email)
        throw new http_1.AppError("email obligatoire", 400);
    if (!body.password)
        throw new http_1.AppError("password obligatoire", 400);
    const result = await auth_service_1.AuthService.login({
        email: body.email,
        password: body.password,
    });
    res.status(200).json(result);
}));
// Refresh token
exports.authRoutes.post("/refresh", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.refreshToken) {
        throw new http_1.AppError("refreshToken obligatoire", 400);
    }
    const result = await auth_service_1.AuthService.refreshSession(body.refreshToken);
    res.status(200).json(result);
}));
// Logout
exports.authRoutes.post("/logout", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.refreshToken) {
        throw new http_1.AppError("refreshToken obligatoire", 400);
    }
    await auth_service_1.AuthService.logout(body.refreshToken);
    res.status(200).json({ message: "Logout réussi" });
}));
// Get profile (protégé)
exports.authRoutes.get("/profile", auth_middleware_1.authMiddleware, (0, http_1.asyncHandler)(async (req, res) => {
    if (!req.userId)
        throw new http_1.AppError("Utilisateur non identifié", 401);
    const profile = await auth_service_1.AuthService.getProfile(req.userId);
    res.status(200).json(profile);
}));
// Update profile (protégé)
exports.authRoutes.put("/profile", auth_middleware_1.authMiddleware, (0, http_1.asyncHandler)(async (req, res) => {
    if (!req.userId)
        throw new http_1.AppError("Utilisateur non identifié", 401);
    const body = req.body;
    const updated = await auth_service_1.AuthService.updateProfile(req.userId, body);
    res.status(200).json(updated);
}));
//# sourceMappingURL=auth.routes.js.map