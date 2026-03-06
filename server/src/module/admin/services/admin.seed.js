import bcrypt from "bcryptjs";
import { User } from "../../authentication/user.model.js";
import "../../../config/env.js";

export const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true
    });

  } catch (error) {
    console.error("Admin seeding failed:", error);
  }
};