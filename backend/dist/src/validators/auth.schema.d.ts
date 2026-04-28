import { z } from "zod";
/**
 * Zod schemas for strict input validation.
 */
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["FAN", "PLAYER", "STAFF", "MEDICAL", "ADMIN"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: "FAN" | "PLAYER" | "STAFF" | "MEDICAL" | "ADMIN" | undefined;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: "FAN" | "PLAYER" | "STAFF" | "MEDICAL" | "ADMIN" | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.schema.d.ts.map