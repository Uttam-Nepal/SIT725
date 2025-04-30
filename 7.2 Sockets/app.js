const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dataRoutes = require("./routes/dataRoutes");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// API routes
app.use("/api/data", dataRoutes);

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

module.exports = app;
