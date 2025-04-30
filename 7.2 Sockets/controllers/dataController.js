const Project = require("../models/project");

const getData = async (req, res) => {
  try {
    const data = await Project.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

module.exports = { getData };
