import { describe, it, expect } from 'vitest'
import request from 'supertest';
import app from '../src/app';


describe('Health Check API', () => {
    it('should return 200 OK when service is healthy', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');
        expect(response.body.message).toBe('Server is healthy');
        expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });

    it('should return 404 Not Found for unknown routes', async () => {
        const response = await request(app).get('/api/unknown');
        expect(response.status).toBe(404);
        expect(response.body.status).toBe('Not Found');
        expect(response.body.message).toBe("The requested resource 'GET /api/unknown' was not found on this server.");
        expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
});