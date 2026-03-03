import bcrypt from "bcryptjs";
import { User } from "../../authentication/user.model.js";

export const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Bhawna Bhandari",
      email: "bhawnabhandari2004@gmail.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true
    });

    console.log("🔥 Default Admin Created");
    console.log("Email: admin@smarttask.com");
    console.log("Password: Admin@123");
  } catch (error) {
    console.error("Admin seeding failed:", error);
  }
};