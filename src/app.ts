import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import userRoutes from "./modules/users/user.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", healthRoutes);
app.use("/api/auth", userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;