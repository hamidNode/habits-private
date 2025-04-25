//
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Provide default values if not set
  statusCode = statusCode || 500;
  message = message || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    console.error("ERROR 💥:", err);

    return res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      stack: err.stack, // Include stack trace for debugging
    });
  }

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default errorHandler;
