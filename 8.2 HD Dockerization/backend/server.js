const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const dockerRoute = require("./controllers/dockerController");
const seedSuperAdmin = require("./seeders/admin");
const {
  handleLogin,
  handleLogout,
  handleRegister,
} = require("./controllers/authController");
const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionDetails,
  addQuestionReport,
} = require("./controllers/questionController");
const {
  createAnswer,
  updateAnswer,
  deleteAnswer,
} = require("./controllers/answerController");
const {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  getUserDetails,
} = require("./controllers/userController");
const {
  getProfile,
  updateProfile,
} = require("./controllers/profileController");
const isAuthenticated = require("./middlewares/isAuthenticated");
const isSuperAdmin = require("./middlewares/isSuperAdmin");
const User = require("./models/user");

dotenv.config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Middleware to extract session from JWT
const extractSession = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      try {
        const user = await User.findById(decoded.id);
        req.user = user || null;
      } catch (error) {
        req.user = null;
      }
    }
    next();
  });
};

app.use(extractSession);
app.use("/api", router);

// ************** Auth Routes **************
router.post("/auth/logout", handleLogout);
router.post("/auth/register", handleRegister);
router.post("/auth/login", handleLogin);

// ************** Question Routes **************
router.get("/questions", getQuestions);
router.get("/questions/:id", getQuestionDetails);
router.post("/questions", isAuthenticated, createQuestion);
router.put("/questions/:id", isAuthenticated, updateQuestion);
router.delete("/questions/:id", isAuthenticated, deleteQuestion);
router.post("/questions/:id/report", isAuthenticated, addQuestionReport);

// ************** Answer Routes **************
router.post("/answers", isAuthenticated, createAnswer);
router.put("/answers/:id", isAuthenticated, updateAnswer);
router.delete("/answers/:id", isAuthenticated, deleteAnswer);

// ************** User Routes **************
router.get("/users", isAuthenticated, getUsers);
router.get("/users/:id", isAuthenticated, getUserDetails);
router.post("/users", isAuthenticated, isSuperAdmin, createUser);
router.put("/users/:id", isAuthenticated, updateUser);
router.delete("/users/:id", isAuthenticated, deleteUser);

// ************** Profile Routes **************
router.get("/profile", isAuthenticated, getProfile);
router.post("/profile", isAuthenticated, updateProfile);

// ************** Docker Test Route **************
router.get("/student", dockerRoute);

// ************** Database Connection **************
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    );
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

mongoose.connection.once("open", async () => {
  await seedSuperAdmin();
});
