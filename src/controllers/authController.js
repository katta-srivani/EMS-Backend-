import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function sendAdmin(admin, res, message) {
  res.json({
    success: true,
    message,
    token: createToken(admin._id),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
}

export async function registerAdmin(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: "Admin already exists" });

    const admin = await Admin.create({ name, email, password });
    sendAdmin(admin, res, "Admin registered successfully");
  } catch (error) {
    next(error);
  }
}

export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    sendAdmin(admin, res, "Login successful");
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res) {
  res.json({ success: true, admin: req.admin });
}
