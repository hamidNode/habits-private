//
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates it's a known/handled error
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
