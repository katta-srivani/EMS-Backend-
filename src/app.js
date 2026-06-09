import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { attendanceRouter } from "./routes/attendanceRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { departmentRouter } from "./routes/departmentRoutes.js";
import { employeeRouter } from "./routes/employeeRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export const app = express();

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: "30kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (req, res) => res.json({ success: true, message: "Employee Management System API" }));
app.get("/health", (req, res) => res.json({ success: true, message: "API is healthy" }));

app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/attendance", attendanceRouter);

app.use(notFound);
app.use(errorHandler);
