export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: "Duplicate value already exists" });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  res.status(statusCode).json({ success: false, message: err.message || "Server error" });
}
