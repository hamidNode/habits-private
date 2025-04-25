//
import jwt from "jsonwebtoken";
import asyncWrapper from "../utils/asyncWrapper.js";
import AppError from "../utils/AppError.js";
import User from "../models/userModel.js";

const authMiddleware = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Authorization Header:", req.headers.authorization);
  console.log("Extracted Token:", token);

  if (!token) {
    return next(new AppError("No token provided!", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User no longer exists!", 404));
    }

    req.user = user; // Attach user data for APIs

    // Enforce strict authorization for routes with :id
    if (req.params.id && req.user.id !== req.params.id) {
      return next(
        new AppError("Unauthorized to access this resource!", 403)
      );
    }

    return next();
  } catch (err) {
    return next(new AppError("Invalid or expired token!", 401));
  }
});

export default authMiddleware;
