import { Pool } from 'pg';
import { env } from '../config/env.js';

export const pool = new Pool({
    connectionString: env.databaseUrl,
});

export async function testDatabaseConnection(): Promise<void> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT NOW()');
        console.log('Connected to the database');
        console.log('Current time from the database:', result.rows[0].now);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    } finally {
        client.release();
    }
}