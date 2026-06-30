export interface CreateUserResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string | null;
    email: string;
    role: 'USER' | 'ADMIN';
    status: 'ACTIVE' | 'INACTIVE';
    emailVerified: boolean;
    createdAt: Date;
};