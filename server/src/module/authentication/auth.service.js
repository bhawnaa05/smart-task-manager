import bcrypt from "bcryptjs";
import { User } from "./user.model.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../utils/token.utils.js";

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};