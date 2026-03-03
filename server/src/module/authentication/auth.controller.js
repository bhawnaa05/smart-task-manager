import { loginService } from "./auth.service.js";
import { setAuthCookies } from "../../utils/cookie.utils.js";

export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);

    setAuthCookies(
      res,
      result.accessToken,
      result.refreshToken
    );

    res.json({
      message: "Login successful",
      user: result.user
    });
  } catch (err) {
    next(err);
  }
};