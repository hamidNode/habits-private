import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs"; // For hashing passwords
import AppError from "../utils/AppError.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import User from "../models/userModel.js"; // Directly using User model

const credentialFactory = {
  // Login
  login: asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    console.log(password);
    console.log(user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Invalid email or password!", 401));
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ status: "success", token });
  }),

  // Signup
  signup: asyncWrapper(async (req, res, next) => {
    const { password, ...otherFields } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      ...otherFields,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ status: "success", token, user: newUser });
  }),

  // Logout
  logout: asyncWrapper(async (req, res, next) => {
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({
      status: "success",
      message: "Logged out successfully!",
    });
  }),
};

export default credentialFactory;
