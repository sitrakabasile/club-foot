import { Request, Response, NextFunction } from "express";
/**
 * AuthMiddleware — Middleware to protect routes and verify JWT.
 */
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * roleMiddleware — Middleware to enforce Role-Based Access Control (RBAC).
 */
export declare const roleMiddleware: (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map