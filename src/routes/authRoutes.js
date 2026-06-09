import express from "express";
import { getMe, loginAdmin, registerAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

export const authRouter = express.Router();

authRouter.post("/register", registerAdmin);
authRouter.post("/login", loginAdmin);
authRouter.get("/me", protect, getMe);
