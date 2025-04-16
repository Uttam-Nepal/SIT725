const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// GET route to fetch all data
router.get("/", async (req, res) => {
  try {
    const data = await Project.find();
    res.json(data);
  } catch (error) {
    res.status(500).send("Database error");
  }
});

module.exports = router;
