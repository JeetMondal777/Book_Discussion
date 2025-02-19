const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const portServer = server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const io = require("socket.io")(portServer, {
    pingTimeout: 60000,
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Join user's personal room
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    // Join chat room
    socket.on("join chat", (room) => {
        socket.join(room);
    });

    // Handle new messages
    socket.on("new message", (newMessage) => {
        const chat = newMessage.chat;
        
        // Broadcast to entire chat room EXCEPT sender
        socket.to(chat._id).emit("message received", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});