import { User } from "@prisma/client";
/**
 * UserRepository — Data access layer for User entity.
 * Decouples database operations from business logic.
 */
export declare class UserRepository {
    private prisma;
    constructor();
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: any): Promise<User>;
    update(id: string, data: any): Promise<User>;
    findByResetToken(token: string): Promise<User | null>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=user.repository.d.ts.map