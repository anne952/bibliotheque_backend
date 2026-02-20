import { AuthService, hashPassword, verifyPassword, generateRefreshToken } from "../auth.service";
import { prisma } from "../../../config/prisma";
import { AppError } from "../../../common/http";

jest.mock("../../../config/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    session: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe("Authentication - Password Functions", () => {
  describe("hashPassword", () => {
    it("should hash password with salt", () => {
      const password = "test123";
      const hash = hashPassword(password);

      expect(hash).toContain(":");
      const [salt, hashedPart] = hash.split(":");
      expect(salt).toHaveLength(32); // 16 bytes in hex = 32 chars
      expect(hashedPart).toHaveLength(64); // SHA256 = 64 hex chars
    });

    it("should produce different hashes for same password (due to salt)", () => {
      const password = "test123";
      const hash1 = hashPassword(password);
      const hash2 = hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("verifyPassword", () => {
    it("should verify correct password", () => {
      const password = "test123";
      const hash = hashPassword(password);

      expect(verifyPassword(password, hash)).toBe(true);
    });

    it("should reject incorrect password", () => {
      const password = "test123";
      const hash = hashPassword(password);

      expect(verifyPassword("wrongpassword", hash)).toBe(false);
    });
  });

  describe("generateRefreshToken", () => {
    it("should generate token", () => {
      const token = generateRefreshToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token).toHaveLength(64); // 32 bytes in hex = 64 chars
    });

    it("should generate different tokens", () => {
      const token1 = generateRefreshToken();
      const token2 = generateRefreshToken();

      expect(token1).not.toBe(token2);
    });
  });
});

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register new user successfully", async () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        passwordHash: "hashed",
        companyName: "Entreprise VGR",
        profilePicture: null,
        isActive: true,
      };

      (prisma.user.count as jest.Mock).mockResolvedValue(0);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await AuthService.register({
        email: "test@example.com",
        password: "test123",
        companyName: "Entreprise VGR",
      });

      expect(result.email).toBe("test@example.com");
      expect(result.companyName).toBe("Entreprise VGR");
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it("should block registration when a principal account already exists", async () => {
      (prisma.user.count as jest.Mock).mockResolvedValue(1);

      await expect(
        AuthService.register({
          email: "test@example.com",
          password: "test123",
        }),
      ).rejects.toThrow(AppError);
    });

    it("should throw error if email already registered", async () => {
      (prisma.user.count as jest.Mock).mockResolvedValue(0);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
      });

      await expect(
        AuthService.register({
          email: "test@example.com",
          password: "test123",
        }),
      ).rejects.toThrow(AppError);
    });
  });

  describe("login", () => {
    it("should login user successfully", async () => {
      const password = "test123";
      const hash = hashPassword(password);

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        passwordHash: hash,
        isActive: true,
        companyName: "Entreprise VGR",
        profilePicture: null,
      });

      (prisma.session.create as jest.Mock).mockResolvedValue({
        id: "session-123",
        refreshToken: "token-123",
      });

      const result = await AuthService.login({
        email: "test@example.com",
        password,
      });

      expect(result.user.email).toBe("test@example.com");
      expect(result.user.companyName).toBe("Entreprise VGR");
      expect(result.refreshToken).toBeDefined();
      expect(prisma.session.create).toHaveBeenCalled();
    });

    it("should throw error for invalid email", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        AuthService.login({
          email: "nonexistent@example.com",
          password: "test123",
        }),
      ).rejects.toThrow(AppError);
    });

    it("should throw error for wrong password", async () => {
      const correctPassword = "test123";
      const hash = hashPassword(correctPassword);

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        passwordHash: hash,
        isActive: true,
      });

      await expect(
        AuthService.login({
          email: "test@example.com",
          password: "wrongpassword",
        }),
      ).rejects.toThrow(AppError);
    });

    it("should throw error if user is inactive", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        passwordHash: "hash",
        isActive: false,
      });

      await expect(
        AuthService.login({
          email: "test@example.com",
          password: "test123",
        }),
      ).rejects.toThrow(AppError);
    });
  });

  describe("refreshSession", () => {
    it("should rotate token and keep previous token valid during 1-minute grace period", async () => {
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);

      (prisma.session.findUnique as jest.Mock).mockResolvedValue({
        id: "session-123",
        userId: "user-123",
        refreshToken: "old-token",
        expiresAt,
        revokedAt: null,
        user: {
          id: "user-123",
          email: "test@example.com",
          companyName: "Entreprise VGR",
          profilePicture: null,
          isActive: true,
        },
      });

      (prisma.session.create as jest.Mock).mockResolvedValue({ id: "session-456" });
      (prisma.session.update as jest.Mock).mockResolvedValue({ id: "session-123" });

      const result = await AuthService.refreshSession("old-token");

      expect(result.user.email).toBe("test@example.com");
      expect(result.refreshToken).toBeDefined();
      expect(result.refreshToken).not.toBe("old-token");
      expect(prisma.session.create).toHaveBeenCalledTimes(1);
      expect(prisma.session.update).toHaveBeenCalledWith({
        where: { id: "session-123" },
        data: {
          revokedAt: expect.any(Date),
        },
      });
    });

    it("should reject token after grace period is over", async () => {
      const now = new Date();

      (prisma.session.findUnique as jest.Mock).mockResolvedValue({
        id: "session-123",
        userId: "user-123",
        refreshToken: "old-token",
        expiresAt: new Date(now.getTime() + 60 * 60 * 1000),
        revokedAt: new Date(now.getTime() - 1000),
        user: {
          id: "user-123",
          email: "test@example.com",
          companyName: "Entreprise VGR",
          profilePicture: null,
          isActive: true,
        },
      });

      await expect(AuthService.refreshSession("old-token")).rejects.toThrow(AppError);
    });
  });

  describe("getProfile", () => {
    it("should get user profile successfully", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        companyName: "Company",
        profilePicture: null,
        isActive: true,
      });

      const result = await AuthService.getProfile("user-123");

      expect(result.email).toBe("test@example.com");
      expect(result.id).toBe("user-123");
    });

    it("should throw error if user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(AuthService.getProfile("nonexistent")).rejects.toThrow(
        AppError,
      );
    });
  });
});
