export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string | null;
    email: string;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    createdAt: Date;
    passwordHash: string;
    lastLoginAt: Date | null;
    updatedAt: Date;
};

export interface UserRow {
    id: string;
    username: string;
    first_name: string;
    last_name: string | null;
    email: string;
    role: UserRole;
    status: UserStatus;
    email_verified: boolean;
    created_at: Date;
    password_hash: string;
    last_login_at: Date | null;
    updated_at: Date;
};