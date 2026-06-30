import bcrypt from 'bcrypt';
import type { CreateUserRequest } from './dto/create-user.request.js';
import type { CreateUserResponse } from './dto/create-user.response.js';
import type { DatabaseError } from 'pg';
import { createUser, findUserByEmail, findUserByUsername } from './user.repository.js';
import { ConflictError } from '../../shared/errors/index.js';

const SALT_ROUNDS = 12;

function isUniqueViolation(error: unknown): error is DatabaseError {
    return error instanceof Error && 'code' in error && (error as DatabaseError).code === '23505';
}

export async function registerUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    // Check if the email is already registered
    const existingUserByEmail = await findUserByEmail(data.email);
    if (existingUserByEmail) {
        throw new ConflictError('Email is already registered');
    }

    // Check if the username is already taken
    const existingUserByUsername = await findUserByUsername(data.username);
    if (existingUserByUsername) {
        throw new ConflictError('Username is already taken');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    // Create the user in the database
    let newUser;
    try {
        newUser = await createUser({ ...data, passwordHash });
    } catch (error) {
        if (isUniqueViolation(error)) {
            if (error.constraint === 'users_email_key') {
                throw new ConflictError('Email is already registered');
            }

            if (error.constraint === 'users_username_key') {
                throw new ConflictError('Username is already taken');
            }

            throw new ConflictError('User already exists');
        }

        throw error;
    }

    return {
        id: newUser.id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        emailVerified: newUser.emailVerified,
        createdAt: newUser.createdAt,
    };
}