//
import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log("errors");
  console.log(errors);
  console.log("errors");

  if (!errors.isEmpty()) {
    // return  res.status(400).json({ errors: errors.array() });

    const message = errors.errors.map((el) => el.msg, 400);
    next(new AppError(message));
  }
  next();
};

export default validate;
