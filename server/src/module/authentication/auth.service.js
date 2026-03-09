import bcrypt from "bcryptjs";
import { User } from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../utils/token.utils.js";

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};