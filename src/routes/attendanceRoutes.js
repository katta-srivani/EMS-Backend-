import express from "express";
import { getAttendance, markAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/auth.js";

export const attendanceRouter = express.Router();

attendanceRouter.use(protect);
attendanceRouter.route("/").get(getAttendance).post(markAttendance);
