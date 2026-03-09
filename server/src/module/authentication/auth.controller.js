import { loginService } from "./auth.service.js";
import { setAuthCookies } from "../../utils/cookie.utils.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);

    setAuthCookies(
      res,
      result.accessToken,
      result.refreshToken
    );

    res.json(
      new ApiResponse(200, { user: result.user }, "Login successful")
    );
  } catch (err) {
    next(err);
  }
};