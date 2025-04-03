const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection string
mongoose
  .connect(
    "mongodb+srv://uttam:uttam123@cluster0.otwllse.mongodb.net/myprojectDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Define the data schema
const dataSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Data = mongoose.model("Data", dataSchema);

// API endpoint to fetch data from MongoDB
app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find(); // Fetch all records
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App listening on port " + port);
});
