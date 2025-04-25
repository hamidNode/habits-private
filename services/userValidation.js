//
import { body } from "express-validator";

const userValidationRules = {
  register: [
    body("username")
      .trim()
      .escape()
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Username must be between 5 and 25 characters long."
      ),
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email format."),
    body("password")
      .trim()
      .isLength({ min: 8, max: 30 })
      .withMessage(
        "Password must be between 8 and 30 characters long."
      )
      .matches(/[A-Z]/)
      .withMessage(
        "Password must include at least one uppercase letter."
      )
      .matches(/[0-9]/)
      .withMessage("Password must include at least one number.")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        'Password must include at least one character of (!@#$%^&*(),.?":{}|<>).'
      ),
    body("medicalHistory")
      .trim()
      .escape()
      .isLength({ max: 500 })
      .withMessage("Medical history must not exceed 500 characters."),
  ],
};

export default userValidationRules;
