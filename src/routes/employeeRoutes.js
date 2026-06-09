import express from "express";
import { createEmployee, deleteEmployee, getDashboardStats, getEmployees, updateEmployee } from "../controllers/employeeController.js";
import { protect } from "../middleware/auth.js";

export const employeeRouter = express.Router();

employeeRouter.use(protect);
employeeRouter.get("/stats", getDashboardStats);
employeeRouter.route("/").get(getEmployees).post(createEmployee);
employeeRouter.route("/:id").put(updateEmployee).delete(deleteEmployee);
