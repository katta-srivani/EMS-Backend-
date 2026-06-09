import { Department } from "../models/Department.js";

export async function createDepartment(req, res, next) {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ success: true, message: "Department created", data: department });
  } catch (error) {
    next(error);
  }
}

export async function getDepartments(req, res, next) {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json({ success: true, data: departments });
  } catch (error) {
    next(error);
  }
}

export async function deleteDepartment(req, res, next) {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ success: false, message: "Department not found" });
    res.json({ success: true, message: "Department deleted" });
  } catch (error) {
    next(error);
  }
}
