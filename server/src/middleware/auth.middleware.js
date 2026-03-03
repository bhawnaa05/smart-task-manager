import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, ENV.ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};