import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorMiddleware } from "./middleware/error.middleware.js";

// Import routes
import authRoutes from "./module/authentication/auth.routes.js";
// import adminRoutes from "./module/admin/admin.routes.js";
// import managerRoutes from "./module/manager/manager.routes.js";
// import employeeRoutes from "./module/employee/employee.routes.js";

const app = express();

// MIDDLEWARE

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// ROUTES

app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/manager", managerRoutes);
// app.use("/api/employee", employeeRoutes);

//ERROR HANDLER

app.use(errorMiddleware);

export default app;