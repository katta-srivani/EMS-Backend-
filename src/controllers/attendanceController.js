import { Attendance } from "../models/Attendance.js";

export async function markAttendance(req, res, next) {
  try {
    const { employee, date, status, checkIn, checkOut } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { employee, date },
      { employee, date, status, checkIn, checkOut },
      { upsert: true, new: true, runValidators: true }
    ).populate("employee", "name email designation");
    res.json({ success: true, message: "Attendance saved", data: attendance });
  } catch (error) {
    next(error);
  }
}

export async function getAttendance(req, res, next) {
  try {
    const query = {};
    if (req.query.date) query.date = req.query.date;
    if (req.query.employee) query.employee = req.query.employee;
    const records = await Attendance.find(query).populate("employee", "name email designation").sort({ date: -1, createdAt: -1 });
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
}
