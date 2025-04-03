const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://uttam:uttam123@cluster0.otwllse.mongodb.net/myprojectDB?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { serverSelectionTimeoutMS: 30000 }) // 30 seconds timeout
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema & Model
const DataSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Data = mongoose.model("Data", DataSchema);

// Sample Data
const seedData = [
  {
    title: "Kitten 1",
    image: "/images/kitten1.jpg", // Ensure these images exist in /public/images
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

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data in the Data collection
    await Data.deleteMany({});

    // Insert new seed data
    await Data.insertMany(seedData);

    console.log("Database seeded successfully");
    mongoose.connection.close(); // Close the connection after seeding
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

// Run the seeding function
seedDatabase();
