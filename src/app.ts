import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", healthRoutes);
app.use(notFoundHandler);

export default app;