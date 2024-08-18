const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Basic route for testing
app.get("/author", (req, res) => {
  res.json({
    status: 200,
    message: "Server running",
    data: {
      name: process.env.AUTHOR_NAME,
      github: process.env.GITHUB_URL,
    },
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
