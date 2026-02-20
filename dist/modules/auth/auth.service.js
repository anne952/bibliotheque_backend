"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateRefreshToken = generateRefreshToken;
const crypto_1 = require("crypto");
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../common/http");
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_ROTATION_GRACE_MS = 60 * 1000;
/**
 * Hash a password using SHA-256 + salt
 */
function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16).toString("hex");
    const hash = (0, crypto_1.createHash)("sha256")
        .update(password + salt)
        .digest("hex");
    return `${salt}:${hash}`;
}
/**
 * Verify a password against a hash
 */
function verifyPassword(password, hash) {
    const [salt, originalHash] = hash.split(":");
    const newHash = (0, crypto_1.createHash)("sha256")
        .update(password + salt)
        .digest("hex");
    return newHash === originalHash;
}
/**
 * Generate a refresh token
 */
function generateRefreshToken() {
    return (0, crypto_1.randomBytes)(32).toString("hex");
}
class AuthService {
    static async getRegistrationStatus() {
        const usersCount = await prisma_1.prisma.user.count({
            where: { deletedAt: null },
        });
        return {
            canRegister: usersCount === 0,
            usersCount,
        };
    }
    /**
     * Register a new user
     */
    static async register(input) {
        const status = await this.getRegistrationStatus();
        if (!status.canRegister) {
            throw new http_1.AppError("Inscription desactivee: un compte principal existe deja. Utilisez la connexion.", 403);
        }
        // Check if user already exists
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (existing) {
            throw new http_1.AppError("Cet email est deja enregistre", 409);
        }
        const passwordHash = hashPassword(input.password);
        const user = await prisma_1.prisma.user.create({
            data: {
                email: input.email,
                passwordHash,
                companyName: input.companyName,
            },
        });
        return {
            id: user.id,
            email: user.email,
            companyName: user.companyName,
            profilePicture: user.profilePicture,
            isActive: user.isActive,
        };
    }
    /**
     * Login a user
     */
    static async login(input) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (!user || !user.isActive) {
            throw new http_1.AppError("Email ou mot de passe incorrect", 401);
        }
        const isValid = verifyPassword(input.password, user.passwordHash);
        if (!isValid) {
            throw new http_1.AppError("Email ou mot de passe incorrect", 401);
        }
        // Create a refresh token
        const refreshToken = generateRefreshToken();
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS); // 7 days
        await prisma_1.prisma.session.create({
            data: {
                userId: user.id,
                refreshToken,
                expiresAt,
            },
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                companyName: user.companyName,
                profilePicture: user.profilePicture,
                isActive: user.isActive,
            },
            refreshToken,
        };
    }
    /**
     * Refresh a session
     */
    static async refreshSession(refreshToken) {
        const session = await prisma_1.prisma.session.findUnique({
            where: { refreshToken },
            include: { user: true },
        });
        const now = new Date();
        if (!session ||
            (session.revokedAt !== null && session.revokedAt <= now) ||
            session.expiresAt < now) {
            throw new http_1.AppError("Token invalide ou expire", 401);
        }
        if (!session.user.isActive) {
            throw new http_1.AppError("Utilisateur inactif", 403);
        }
        // Generate new refresh token
        const newRefreshToken = generateRefreshToken();
        const newExpiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
        const oldTokenRevokedAt = new Date(Date.now() + REFRESH_TOKEN_ROTATION_GRACE_MS);
        await prisma_1.prisma.session.create({
            data: {
                userId: session.userId,
                refreshToken: newRefreshToken,
                expiresAt: newExpiresAt,
            },
        });
        await prisma_1.prisma.session.update({
            where: { id: session.id },
            data: {
                revokedAt: oldTokenRevokedAt,
            },
        });
        return {
            user: {
                id: session.user.id,
                email: session.user.email,
                companyName: session.user.companyName,
                profilePicture: session.user.profilePicture,
                isActive: session.user.isActive,
            },
            refreshToken: newRefreshToken,
        };
    }
    /**
     * Logout a user
     */
    static async logout(refreshToken) {
        const session = await prisma_1.prisma.session.findUnique({
            where: { refreshToken },
        });
        if (session) {
            await prisma_1.prisma.session.update({
                where: { id: session.id },
                data: { revokedAt: new Date() },
            });
        }
    }
    /**
     * Get user profile
     */
    static async getProfile(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                companyName: true,
                profilePicture: true,
                isActive: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw new http_1.AppError("Utilisateur non trouve", 404);
        }
        return user;
    }
    /**
     * Update user profile
     */
    static async updateProfile(userId, updates) {
        const user = await prisma_1.prisma.user.update({
            where: { id: userId },
            data: updates,
            select: {
                id: true,
                email: true,
                companyName: true,
                profilePicture: true,
                isActive: true,
            },
        });
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map