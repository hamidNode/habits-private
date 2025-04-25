// //

import express from "express";

import {
  getUserById,
  updateUser,
  getRoot,
  loginUser,
  signupUser,
  postFeedback,
} from "../controllers/userApiController.js";
import userValidation from "../services/userValidation.js";
import validate from "../middleware/validationMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const { register } = userValidation;

const router = express.Router();

// Public Routes
router.route("/").get(getRoot);
router.route("/signup").post(register, validate, signupUser);
router.route("/login").post(loginUser);

// Protected Routes
router.use(authMiddleware); // Apply authentication middleware for all routes below

router
  .route("/:id")
  .get(getUserById) // Fetch a specific user
  .patch(updateUser); // Update a specific user

router.route("/:id/feedback").post(postFeedback);

export default router;
