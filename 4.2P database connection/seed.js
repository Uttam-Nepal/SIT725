const mongoose = require("mongoose");
require("dotenv").config(); // For loading environment variables

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, { serverSelectionTimeoutMS: 30000 }) // 30 seconds timeout
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema & Model
const DataSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Data = mongoose.model("Data", DataSchema);

const seedData = [
  {
    title: "Kitten 1",
    image: "/public/images/kitten1.jpg",
    link: "About Kitten 1",
    description: "Demo description about kitten 1",
  },
  {
    title: "Kitten 2",
    image: "/public/images/kitten2.jpg",
    link: "About Kitten 2",
    description: "Demo description about kitten 2",
  },
  {
    title: "Kitten 3",
    image: "/public/images/kitten3.jpg",
    link: "About Kitten 3",
    description: "Demo description about kitten 3",
  },
];

async function seedDatabase() {
  try {
    await Data.deleteMany({});

    await Data.insertMany(seedData);

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

seedDatabase();
