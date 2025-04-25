//
import mongoSanitize from "mongo-sanitize";
import AppError from "./AppError.js";

const registerUserLogic = async (req, next) => {
  const allowedFields = [
    "username",
    "email",
    "password",
    "confirmPassword",
    "currentLifestyle",
    "weight",
    "height",
    "gender",
    "dob",
  ];
  let sanitizedData = mongoSanitize(req.body);

  // Remove unexpected fields
  sanitizedData = Object.keys(sanitizedData)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = sanitizedData[key];
      return obj;
    }, {});

  // Validate data
  if (sanitizedData.password !== sanitizedData.confirmPassword) {
    return next(new AppError("Passwords do not match!", 400));
  }

  return sanitizedData; // Return sanitized and validated data
};

export default registerUserLogic;
