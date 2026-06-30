import { pool } from '../../db/index.js'
import type { CreateUserRequest } from './dto/create-user.request.js'
import type { User, UserRow } from './user.types.js'

interface CreateUserData extends CreateUserRequest {
    passwordHash: string;
}

function mapRowToUser(row: UserRow): User {
    return {
        id: row.id,
        username: row.username,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        role: row.role,
        status: row.status,
        emailVerified: row.email_verified,
        createdAt: new Date(row.created_at),
        passwordHash: row.password_hash,
        lastLoginAt: row.last_login_at ? new Date(row.last_login_at) : null,
        updatedAt: new Date(row.updated_at),
    };
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query<UserRow>('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
        return null;
    }
    const row = result.rows[0];
    if (!row) {
        return null;
    }
    return mapRowToUser(row);
}

export async function findUserByUsername(username: string): Promise<User | null> {
    const result = await pool.query<UserRow>('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
        return null;
    }
    const row = result.rows[0];
    if (!row) {
        return null;
    }
    return mapRowToUser(row);
}

export async function createUser(data: CreateUserData): Promise<User> {
    const result = await pool.query<UserRow>(
        `INSERT INTO users (username, first_name, last_name, email, password_hash)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [data.username, data.firstName, data.lastName, data.email, data.passwordHash]
    );
    const row = result.rows[0];
    if (!row) {
        throw new Error('Failed to create user. No row returned from insert.');
    }
    return mapRowToUser(row);
}