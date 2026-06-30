import request from 'supertest';
import { describe, expect, it, beforeEach } from 'vitest'
import app from '../../src/app';
import { pool } from '../../src/db';

describe("POST /api/auth/register", () => {
    beforeEach(async () => {
        // Clear the users table before each test
        await pool.query('DELETE FROM users');
    });

    it("should register a new user successfully", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                firstName: "Test",
                lastName: "User",
                email: "testuser@example.com",
                password: "Password@123"
            });
        expect(response.status).toBe(201);
        expect(response.body.status).toBe("SUCCESS");
        expect(response.body.data).toMatchObject({
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "testuser@example.com",
            role: "USER",
            status: "ACTIVE",
            emailVerified: false
        });

        expect(response.body.data.passwordHash).toBeUndefined(); // Ensure password hash is not returned
        expect(response.body.data.password).toBeUndefined(); // Ensure password is not returned
    });

    it("should return 409 when email is already registered", async () => {
        const payload = {
            username: "testuser1",
            firstName: "Test",
            lastName: "User",
            email: "duplicate@example.com",
            password: "Password@123"
        };

        // First registration should succeed
        await request(app)
            .post("/api/auth/register")
            .send(payload);

        // Second registration with the same email should fail
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                ...payload,
                username: "testuser2" // Change username to avoid conflict
            });
        expect(response.status).toBe(409);
        expect(response.body.status).toBe("FAIL");
        expect(response.body.message).toBe("Email is already registered");
    });

    it("should return 409 when username is already taken", async () => {
        const payload = {
            username: "duplicateuser",
            firstName: "Test",
            lastName: "User",
            email: "user1@example.com",
            password: "Password@123"
        };

        // First registration should succeed
        await request(app)
            .post("/api/auth/register")
            .send(payload);

        // Second registration with the same username should fail
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                ...payload,
                email: "user2@example.com" // Change email to avoid conflict
            });
        expect(response.status).toBe(409);
        expect(response.body.status).toBe("FAIL");
        expect(response.body.message).toBe("Username is already taken");
    });

    it("should return 400 for invalid email format", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                firstName: "Test",
                lastName: "User",
                email: "invalid-email-format",
                password: "Password@123"
            });
        expect(response.status).toBe(400);
        expect(response.body.status).toBe("FAIL");
        expect(response.body.message).toContain("Invalid email address");
    });

    it("should return 400 when required fields are missing", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                email: "missing@example.com",
                password: "Password@123"
            })

        expect(response.status).toBe(400);
        expect(response.body.status).toBe("FAIL");
    });

});
