const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/employees", employeeRoutes);

// Test database connection when the app starts
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err.message);
  });

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Backend is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
