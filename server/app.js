import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";

// Note: This implementation was requested by client despite being non-compliant with DPDP Act.


// Load environment variables
config();


// Import middleware
import { ApiResponsive } from "./utils/ApiResponsive.js";

import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import cibilRoutes from "./routes/cibil.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import userLoanRoutes from "./routes/userLoan.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import consentRoutes from "./routes/consent.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";



const app = express();

// Trust proxy for proper IP address extraction
app.set('trust proxy', true);

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
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4173",
    "https://admin.borrowww.com",
    "https://www.admin.borrowww.com",
    "https://borrowww.com",
    "https://www.borrowww.com"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};


// CORS must be applied before any routes
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
        encryption: "Active",
        consentTracking: "Enabled",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
      },
      "API Server is running successfully"
    )
  );
});

// Mount admin API routes
app.use("/api/admin", adminRoutes);

// Mount user API routes
app.use("/api/users", userRoutes);


// Mount cibil API routes
app.use("/api/cibil", cibilRoutes);


// Mount loan API routes

// Mount session tracking API routes
app.use("/api/sessions", sessionRoutes);

// Mount consent management API routes
app.use("/api/consent", consentRoutes);

// Mount inquiry API routes
app.use("/api/inquiries", inquiryRoutes);

app.use("/api/loans", loanRoutes);

// Mount user loan API routes (user CRUD)
app.use("/api/user/loans", userLoanRoutes);

// Mount referral API routes
app.use("/api/referrals", referralRoutes);

// Mount tracking API routes
app.use("/api/tracking", trackingRoutes);

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



// 404 handler for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler (always return JSON)
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;

  // Handle Prisma connection errors specifically
  if (err.code === 'P1001' || err.message?.includes('Can\'t reach database server')) {
    console.error('Database connection failed:', err.message);
    return res.status(503).json({
      success: false,
      error: "Service temporarily unavailable. Please try again later.",
      // Only show details in dev environment, but never show raw connection string
      stack: process.env.NODE_ENV === "development" ? "Database connection failed" : undefined,
    });
  }

  // Handle other Prisma errors
  if (err.stack?.includes('@prisma/client')) {
    console.error('Prisma Error:', err);
    return res.status(500).json({
      success: false,
      error: "Internal failure",
      stack: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }

  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});


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
