const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connectDB = require("./db/db");

// Routes
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const chatRoutes = require("./routes/chat.routes");
const messageRoutes = require("./routes/message.routes");
const reviewRoutes = require("./routes/review.routes");

// Database Connection
connectDB();

// Middleware Configuration
app.disable("x-powered-by");
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    //methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

// API Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);
app.use("/reviews", reviewRoutes);

// Basic Route
app.get("/", (req, res) => {
    res.send("Book Discussion API");
});

module.exports = app;