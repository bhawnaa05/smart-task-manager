import express from "express";
import { registerUser } from "./controllers/admin.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { allowRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.post(
"/create-user",
authMiddleware,
allowRoles("admin"),
registerUser
);

export default router;