const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDB = require("./db/db");

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const chatRoutes = require("./routes/chat.routes");
const messageRoutes = require("./routes/message.routes");

connectDB();

const app = express();

app.use(cors({ 
    credentials: true,
    origin:process.env.CLIENT_BASE_URL
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

// Home route
app.get("/", (req, res) => {
    res.send("Hello World");
});

module.exports = app;
