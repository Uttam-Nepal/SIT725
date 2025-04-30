const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

// Serve static assets from public/
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html manually from views/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API endpoint
app.get("/api/data", (req, res) => {
  res.json([
    {
      title: "Example Card",
      description: "This is an example card from the API.",
      image: "/images/demo.jpg",
      link: "#",
    },
  ]);
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 10);
    socket.emit("number", randomNumber);
  }, 1000);
});

// Start the server
http.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
