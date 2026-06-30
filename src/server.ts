import app from "./app.js";
import { env } from "./config/env.js"
import { closeDatabasePool } from "./db/index.js";
import { testDatabaseConnection } from "./db/pool.js";

async function bootstrap() {

    await testDatabaseConnection();

    const server = app.listen(env.port, () => {
        console.log(`Server is running on port ${env.port}`);
    });

    let isShuttingDown = false;

    const shutdown = async (signal: string): Promise<void> => {
        if (isShuttingDown) {
            return;
        }
        isShuttingDown = true;
        console.log(`Received ${signal}. Shutting down...`);
        
        server.close(async () => {
            try {
                await closeDatabasePool();
                console.log('Database pool closed successfully.');
            } catch (error) {
                console.error('Error during shutdown:', error);
                process.exit(1);
            }
        });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap();