import { User } from "../module/authentication/user.model.js";

export const verifiedMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.isVerified) {
    return res.status(403).json({
      message: "Profile not verified by admin"
    });
  }

  next();
};