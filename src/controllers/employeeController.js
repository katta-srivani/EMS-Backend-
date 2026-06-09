import { Attendance } from "../models/Attendance.js";
import { Department } from "../models/Department.js";
import { Employee } from "../models/Employee.js";

function buildQuery(queryParams) {
  const query = {};
  if (queryParams.search) {
    const regex = new RegExp(queryParams.search.trim(), "i");
    query.$or = [{ name: regex }, { email: regex }, { designation: regex }, { phone: regex }];
  }
  if (queryParams.department && queryParams.department !== "All") query.department = queryParams.department;
  if (queryParams.status && queryParams.status !== "All") query.status = queryParams.status;
  return query;
}

export async function createEmployee(req, res, next) {
  try {
    const employee = await Employee.create(req.body);
    const populated = await employee.populate("department", "name");
    res.status(201).json({ success: true, message: "Employee added", data: populated });
  } catch (error) {
    next(error);
  }
}

export async function getEmployees(req, res, next) {
  try {
    const employees = await Employee.find(buildQuery(req.query)).populate("department", "name").sort({ createdAt: -1 });
    res.json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("department", "name");
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });
    res.json({ success: true, message: "Employee updated", data: employee });
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });
    await Attendance.deleteMany({ employee: req.params.id });
    res.json({ success: true, message: "Employee deleted" });
  } catch (error) {
    next(error);
  }
}

export async function getDashboardStats(req, res, next) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const [totalEmployees, activeEmployees, totalDepartments, todayAttendance] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: "Active" }),
      Department.countDocuments(),
      Attendance.find({ date: today }),
    ]);

    const presentToday = todayAttendance.filter((a) => a.status === "Present").length;
    const absentToday = todayAttendance.filter((a) => a.status === "Absent").length;
    const leaveToday = todayAttendance.filter((a) => a.status === "Leave").length;

    res.json({ success: true, data: { totalEmployees, activeEmployees, totalDepartments, presentToday, absentToday, leaveToday } });
  } catch (error) {
    next(error);
  }
}
