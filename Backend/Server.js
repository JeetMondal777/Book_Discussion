const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO Configuration
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_URL || "*",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    },
    transports: ['websocket', 'polling']
});

// Socket.IO Event Handlers
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
    });

    socket.on("new message", (newMessage) => {
        const chat = newMessage.chat;
        socket.to(chat._id).emit("message received", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start Server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});