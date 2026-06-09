import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Employee name is required"], trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    salary: { type: Number, required: true, min: 0 },
    joiningDate: { type: Date, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

employeeSchema.index({ name: "text", email: "text", designation: "text" });

export const Employee = mongoose.model("Employee", employeeSchema);
