const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware (required by assignment)
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/references", require("./routes/reference.routes"));

// Base route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Global error handler (must be last)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
