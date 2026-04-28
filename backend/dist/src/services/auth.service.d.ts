/**
 * AuthService — Business logic layer for authentication.
 * Handles password hashing, token generation, and credential validation.
 */
export declare class AuthService {
    private secret;
    constructor();
    /**
     * Register a new user with hashed password.
     */
    register(data: any): Promise<{
        user: any;
        token: string;
    }>;
    /**
     * Login user and validate credentials.
     */
    login(credentials: any): Promise<{
        user: any;
        token: string;
    }>;
    /**
     * Update user profile (name, email).
     */
    updateProfile(userId: string, data: any): Promise<any>;
    /**
     * Change user password.
     */
    changePassword(userId: string, data: any): Promise<{
        message: string;
    }>;
    /**
     * Request password reset token.
     */
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    /**
     * Reset password using token.
     */
    resetPassword(data: any): Promise<{
        message: string;
    }>;
    /**
     * Generate a signed JWT token.
     */
    private generateToken;
    /**
     * Remove sensitive data from user object.
     */
    private sanitizeUser;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map