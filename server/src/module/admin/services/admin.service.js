import bcrypt from "bcryptjs";
import { User } from "../../authentication/user.model.js";
import { sendAccountCreatedNotification } from "../../notification/notification.service.js";

export const createUserByAdmin = async (adminId, data) => {

    const { name, email, role } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        createdBy: adminId,
        isVerified: false
    });

    // send notification
    await sendAccountCreatedNotification({
        name,
        email,
        password: tempPassword
    });

    return user;
};