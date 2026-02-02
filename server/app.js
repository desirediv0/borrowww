/**
 * ================================================================================
 * EXPRESS APPLICATION CONFIGURATION
 * ================================================================================
 * 
 * SECURITY FEATURES:
 * - Session-based authentication with PostgreSQL store
 * - HTTP-only, secure cookies in production
 * - Helmet for security headers
 * - CORS configured for allowed origins
 * - Production safety middleware
 * 
 * ENVIRONMENT VARIABLES REQUIRED:
 * - NODE_ENV: 'development' or 'production'
 * - DATABASE_URL: PostgreSQL connection string
 * - ADMIN_SESSION_SECRET: Strong random string for session signing
 * 
 * ================================================================================
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import { config } from "dotenv";

// Load environment variables
config();

// Import middleware
import { ApiResponsive } from "./utils/ApiResponsive.js";
import { enforceSoftDelete } from "./middlewares/prodSafety.js";
import { prisma } from "./config/db.js";

// Import routes
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
import clientRoutes from "./routes/client.routes.js";

const app = express();

// Trust proxy for proper IP address extraction
app.set('trust proxy', true);

// ================================================================================
// SECURITY MIDDLEWARE
// ================================================================================

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

// ================================================================================
// CORS CONFIGURATION
// ================================================================================

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
  credentials: true, // CRITICAL: Required for session cookies
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ================================================================================
// BODY PARSING MIDDLEWARE
// ================================================================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ================================================================================
// SESSION CONFIGURATION - SECURE SERVER-SIDE SESSIONS
// ================================================================================

/**
 * SECURITY: Session configuration for admin authentication
 * 
 * - PostgreSQL session store for persistence across restarts
 * - HTTP-only cookies prevent XSS attacks
 * - Secure cookies in production prevent MITM
 * - SameSite protection against CSRF
 * - 24-hour session expiry
 */

const PgSession = connectPgSimple(session);

// Session store: pg Pool with SSL that accepts managed DB self-signed certs (DigitalOcean etc.)
const dbUrl = process.env.DATABASE_URL || '';
const useSsl = /sslmode=require|ondigitalocean\.com/.test(dbUrl);
// Remove sslmode from URL so pg uses our ssl config (rejectUnauthorized: false) instead of verify-full
const sessionConnectionString = dbUrl.replace(/[?&]sslmode=[^&]+/g, '').replace(/\?$|&$/, '') || dbUrl;
const sessionPool = new pg.Pool({
  connectionString: sessionConnectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

// Validate required environment variable
if (!process.env.ADMIN_SESSION_SECRET) {
  console.warn('[SECURITY WARNING] ADMIN_SESSION_SECRET not set. Using fallback for development only.');
}

app.use(session({
  store: new PgSession({
    pool: sessionPool,
    tableName: 'admin_sessions', // Table will be auto-created
    createTableIfMissing: true,
  }),
  secret: process.env.ADMIN_SESSION_SECRET || 'dev-session-secret-change-in-production',
  name: 'admin.sid', // Custom cookie name (not default connect.sid)
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    // Dev: domain=localhost so cookie works across ports. Production: use SESSION_COOKIE_DOMAIN if set (e.g. .yourdomain.com)
    ...(process.env.SESSION_COOKIE_DOMAIN
      ? { domain: process.env.SESSION_COOKIE_DOMAIN }
      : (process.env.NODE_ENV !== 'production' && { domain: 'localhost' })),
  },
}));

// ================================================================================
// REQUEST LOGGING
// ================================================================================

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ================================================================================
// PRISMA MIDDLEWARE - ENFORCE SOFT DELETE
// ================================================================================

/**
 * SECURITY: Apply soft delete middleware to Prisma
 * This intercepts delete operations and converts them to soft deletes
 */
prisma.$use(enforceSoftDelete);

// ================================================================================
// HEALTH CHECK
// ================================================================================

app.get("/", (req, res) => {
  res.status(200).json(
    new ApiResponsive(
      200,
      {
        service: "Borrowww API Server",
        status: "Running",
        version: "2.0.0",
        encryption: "AWS KMS Active",
        sessionAuth: "Enabled",
        softDelete: "Enforced",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
      },
      "API Server is running successfully"
    )
  );
});

// ================================================================================
// API ROUTES
// ================================================================================

// Client routes - Public, encryption only
app.use("/api/client", clientRoutes);

// Admin routes - Protected, decryption allowed
app.use("/api/admin", adminRoutes);

// User routes
app.use("/api/users", userRoutes);

// CIBIL routes
app.use("/api/cibil", cibilRoutes);

// Session tracking routes
app.use("/api/sessions", sessionRoutes);

// Consent management routes
app.use("/api/consent", consentRoutes);

// Inquiry routes (legacy - consider migrating to /api/client)
app.use("/api/inquiries", inquiryRoutes);

// Loan routes
app.use("/api/loans", loanRoutes);

// User loan routes
app.use("/api/user/loans", userLoanRoutes);

// Referral routes
app.use("/api/referrals", referralRoutes);

// Tracking routes
app.use("/api/tracking", trackingRoutes);

// Health check
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

// ================================================================================
// ERROR HANDLING
// ================================================================================

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  // Avoid "Cannot set headers after they are sent" when response was already sent (e.g. after login)
  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;

  // Handle Prisma connection errors
  if (err.code === 'P1001' || err.message?.includes('Can\'t reach database server')) {
    console.error('Database connection failed:', err.message);
    return res.status(503).json({
      success: false,
      error: "Service temporarily unavailable. Please try again later.",
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

// ================================================================================
// GRACEFUL SHUTDOWN
// ================================================================================

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

export default app;
