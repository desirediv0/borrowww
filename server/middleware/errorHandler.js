import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

/**
 * Global Error Handler Middleware
 * Handles all errors in the application and sends consistent error responses
 */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error details for debugging
  console.error(`Error: ${err.message}`);

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ApiError(400, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ApiError(400, message);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ApiError(401, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    error = new ApiError(401, message);
  }

  // Prisma errors
  if (err.code === "P2002") {
    const message = "Duplicate field value entered";
    error = new ApiError(400, message);
  }

  if (err.code === "P2025") {
    const message = "Record not found";
    error = new ApiError(404, message);
  }

  if (err.code && err.code.startsWith("P")) {
    const message = "Database operation failed";
    error = new ApiError(500, message);
  }

  // CORS errors
  if (err.message && err.message.includes("CORS")) {
    const message = "CORS policy violation";
    error = new ApiError(403, message);
  }

  // Rate limiting errors
  if (err.message && err.message.includes("Too many requests")) {
    const message = "Too many requests, please try again later";
    error = new ApiError(429, message);
  }

  // File upload errors
  if (err.code === "LIMIT_FILE_SIZE") {
    const message = "File too large";
    error = new ApiError(400, message);
  }

  // Default to 500 server error
  if (!(error instanceof ApiError)) {
    error = new ApiError(500, "Internal Server Error");
  }

  // Send error response
  res
    .status(error.statusCode || 500)
    .json(
      new ApiResponsive(
        error.statusCode || 500,
        null,
        error.message || "Internal Server Error",
        false
      )
    );
};

/**
 * 404 Not Found Handler
 */
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * Async Error Handler Wrapper
 * Wraps async route handlers to catch errors and pass them to error middleware
 */
export const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
