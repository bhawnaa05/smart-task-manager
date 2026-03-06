import { createUserByAdmin } from "../services/admin.service.js";

export const registerUser = async (req, res, next) => {

    try {

        const adminId = req.user.id;

        const user = await createUserByAdmin(adminId, req.body);

        res.status(201).json({
            message: "User created successfully by admin",
            data: user
        });

    } catch (error) {
        next(error);
    }

};