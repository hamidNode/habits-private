//
import express from "express";

import apiUserRoutes from "./routes/apiUserRoutes.js";
import errorHandler from "./utils/errorHandler.js";
import AppError from "./utils/AppError.js";
import redirectMW from "./middleware/redirectMW.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/v1/users", apiUserRoutes);

app.use("/", redirectMW("/api/v1/users"));

// Handle unhandled routes
app.all(/^.*$/, (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// Error-handling middleware
app.use(errorHandler);

export default app;
