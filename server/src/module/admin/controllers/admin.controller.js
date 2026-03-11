import { createUserByAdmin,assignTaskToManager } from "../services/admin.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const registerUser = async (req, res, next) => {

    try {

        const adminId = req.user.id;

        const user = await createUserByAdmin(adminId, req.body);

        res.status(201).json(
            new ApiResponse(201, user, "User created successfully by admin")
        );

    } catch (error) {
        next(error);
    }

};

export const assignTask = async (req,res,next) => {

    try {

        const adminId = req.user.id;

        const task = await assignTaskToManager(adminId, req.body);

        res.status(201).json(
            new ApiResponse(201, task, "Task assigned successfully")
        );

    } catch(error){
        next(error);
    }

};