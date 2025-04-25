//
import jwt from "jsonwebtoken";

const generateToken = (userId, expiresIn = "1h") => {
  const secretKey = process.env.JWT_SECRET; // Use environment variables for security
  return jwt.sign({ id: userId }, secretKey, { expiresIn }); // Create token with userId and expiration
};

export default { generateToken };
