/**
 * Hash a password using SHA-256 + salt
 */
export declare function hashPassword(password: string): string;
/**
 * Verify a password against a hash
 */
export declare function verifyPassword(password: string, hash: string): boolean;
/**
 * Generate a refresh token
 */
export declare function generateRefreshToken(): string;
export interface RegisterInput {
    email: string;
    password: string;
    companyName?: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export declare class AuthService {
    static getRegistrationStatus(): Promise<{
        canRegister: boolean;
        usersCount: number;
    }>;
    /**
     * Register a new user
     */
    static register(input: RegisterInput): Promise<{
        id: string;
        email: string;
        companyName: string | null;
        profilePicture: string | null;
        isActive: boolean;
    }>;
    /**
     * Login a user
     */
    static login(input: LoginInput): Promise<{
        user: {
            id: string;
            email: string;
            companyName: string | null;
            profilePicture: string | null;
            isActive: true;
        };
        refreshToken: string;
    }>;
    /**
     * Refresh a session
     */
    static refreshSession(refreshToken: string): Promise<{
        user: {
            id: string;
            email: string;
            companyName: string | null;
            profilePicture: string | null;
            isActive: true;
        };
        refreshToken: string;
    }>;
    /**
     * Logout a user
     */
    static logout(refreshToken: string): Promise<void>;
    /**
     * Get user profile
     */
    static getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        companyName: string | null;
        profilePicture: string | null;
        isActive: boolean;
    }>;
    /**
     * Update user profile
     */
    static updateProfile(userId: string, updates: Partial<{
        companyName: string;
        profilePicture: string;
    }>): Promise<{
        id: string;
        email: string;
        companyName: string | null;
        profilePicture: string | null;
        isActive: boolean;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map