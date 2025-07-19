import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";

// Load environment variables
config();

// Import routes
import userAuthRoutes from "./routes/auth/userAuth.js";
import adminAuthRoutes from "./routes/auth/adminAuth.js";
import userRoutes from "./routes/users.js";
import cibilRoutes from "./routes/cibil/cibilModule.js";
import loanRoutes from "./routes/loans/loans.js";
import dashboardRoutes from "./routes/dashboard.js";

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponsive } from "./utils/ApiResponsive.js";

const app = express();

// Security middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = (
      process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:5173"
    ).split(",");

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json(
    new ApiResponsive(
      200,
      {
        service: "Borrowww API Server",
        status: "Running",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
      },
      "API Server is running successfully"
    )
  );
});

app.get("/api/health", (req, res) => {
  res.status(200).json(
    new ApiResponsive(
      200,
      {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      },
      "Health check passed"
    )
  );
});

// API Routes - Testing one by one to isolate issue
app.use("/api/auth", userAuthRoutes); // User authentication
app.use("/api/admin/auth", adminAuthRoutes); // Admin authentication
app.use("/api/users", userRoutes); // User management (Admin)
app.use("/api/cibil", cibilRoutes); // CIBIL management
app.use("/api/loans", loanRoutes); // Loan management
app.use("/api/dashboard", dashboardRoutes); // Dashboard data

// 404 handler for undefined routes
app.all("*", (req, res) => {
  throw new ApiError(404, `Route ${req.originalUrl} not found`);
});

// Global error handling middleware
app.use(errorHandler);

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Unhandled promise rejection handler
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Uncaught exception handler
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

export default app;
