import { createHash, randomBytes } from "crypto";
import { prisma } from "../../config/prisma";
import { AppError } from "../../common/http";

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_ROTATION_GRACE_MS = 60 * 1000;

/**
 * Hash a password using SHA-256 + salt
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  const [salt, originalHash] = hash.split(":");
  const newHash = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return newHash === originalHash;
}

/**
 * Generate a refresh token
 */
export function generateRefreshToken(): string {
  return randomBytes(32).toString("hex");
}

export interface RegisterInput {
  email: string;
  password: string;
  companyName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  static async getRegistrationStatus() {
    const usersCount = await prisma.user.count({
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
  static async register(input: RegisterInput) {
    const status = await this.getRegistrationStatus();
    if (!status.canRegister) {
      throw new AppError(
        "Inscription desactivee: un compte principal existe deja. Utilisez la connexion.",
        403,
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new AppError("Cet email est deja enregistre", 409);
    }

    const passwordHash = hashPassword(input.password);

    const user = await prisma.user.create({
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
  static async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user || !user.isActive) {
      throw new AppError("Email ou mot de passe incorrect", 401);
    }

    const isValid = verifyPassword(input.password, user.passwordHash);
    if (!isValid) {
      throw new AppError("Email ou mot de passe incorrect", 401);
    }

    // Create a refresh token
    const refreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS); // 7 days

    await prisma.session.create({
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
  static async refreshSession(refreshToken: string) {
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

    // Generate new refresh token
    const newRefreshToken = generateRefreshToken();
    const newExpiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
    const oldTokenRevokedAt = new Date(Date.now() + REFRESH_TOKEN_ROTATION_GRACE_MS);

    await prisma.session.create({
      data: {
        userId: session.userId,
        refreshToken: newRefreshToken,
        expiresAt: newExpiresAt,
      },
    });

    await prisma.session.update({
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
  static async logout(refreshToken: string) {
    const session = await prisma.session.findUnique({
      where: { refreshToken },
    });

    if (session) {
      await prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      });
    }
  }

  /**
   * Get user profile
   */
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
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
      throw new AppError("Utilisateur non trouve", 404);
    }

    return user;
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, updates: Partial<{
    companyName: string;
    profilePicture: string;
  }>) {
    const user = await prisma.user.update({
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
