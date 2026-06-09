import express from "express";
import { createDepartment, deleteDepartment, getDepartments } from "../controllers/departmentController.js";
import { protect } from "../middleware/auth.js";

export const departmentRouter = express.Router();

departmentRouter.use(protect);
departmentRouter.route("/").get(getDepartments).post(createDepartment);
departmentRouter.delete("/:id", deleteDepartment);
