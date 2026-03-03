import jwt from "jsonwebtoken";
import "../config/env.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    ENV.ACCESS_SECRET,
    { expiresIn: ENV.ACCESS_EXPIRE }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    ENV.REFRESH_SECRET,
    { expiresIn: ENV.REFRESH_EXPIRE }
  );
};