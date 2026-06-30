import { pool } from './pool.js';

export { pool } from './pool.js';

export async function closeDatabasePool(): Promise<void> {
    await pool.end();
};