import bcrypt from "bcryptjs";
import { User } from "../../authentication/user.model.js";
import { Task } from "../models/task.model.js";
import { sendAccountCreatedNotification,sendTaskAssignedNotification } from "../../notification/notification.service.js";
import { ApiError } from "../../../utils/ApiError.js";

export const createUserByAdmin = async (adminId, data) => {

    const { name, email, role } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
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

export const assignTaskToManager = async (adminId, data) => {

    const { title, description, managerId, weekStart, weekEnd } = data;

    const manager = await User.findById(managerId);

    if (!manager || manager.role !== "manager") {
        throw new ApiError(404, "Manager not found");
    }

    const task = await Task.create({
        title,
        description,
        assignedTo: managerId,
        assignedBy: adminId,
        weekStart,
        weekEnd
    });

    // send email
    await sendTaskAssignedNotification({
        managerName: manager.name,
        email: manager.email,
        taskTitle: title
    });

    return task;
};