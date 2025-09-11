require("dotenv").config();
const express = require("express");
const router = require("./routes/authRoute");
const mongoConnection = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", router);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

mongoConnection().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
