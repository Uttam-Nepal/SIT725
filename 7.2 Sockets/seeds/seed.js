const mongoose = require("mongoose");
require("dotenv").config();
const Project = require("../models/project");

const seedData = [
  {
    title: "Kitten 1",
    image: "/images/kitten1.jpg",
    link: "About Kitten 1",
    description: "Demo description about kitten 1",
  },
  {
    title: "Kitten 2",
    image: "/images/kitten2.jpg",
    link: "About Kitten 2",
    description: "Demo description about kitten 2",
  },
  {
    title: "Kitten 3",
    image: "/images/kitten3.jpg",
    link: "About Kitten 3",
    description: "Demo description about kitten 3",
  },
];

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    await Project.deleteMany({}); // Clear any existing data
    console.log("Inserting new data...");
    await Project.insertMany(seedData); // Insert new seed data
    console.log("Database seeded successfully");
    mongoose.connection.close();
    console.log("MongoDB connection closed after seeding");
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected for seeding");
    seedDatabase();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
