export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: 'FAIL' | 'ERROR';
    public readonly isOperational: boolean;
    
    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain

        this.name = new.target.name;
        this.statusCode = statusCode;
        this.status = statusCode >= 500 ? 'ERROR' : 'FAIL';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}