const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const messageModel = require("../models/message.model");
const chatModel = require("../models/chat.model");
const userModel = require("../models/user");

module.exports.sendMessage = async (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).json({ message: "Content and chatId are required" });
    }

    const newMessage = {
        sender: req.user._id, // Use _id for reference
        content,
        chat: chatId, // Match DB field
    };

    try {
        let message = await messageModel.create(newMessage);

        // Populate sender and chat
        message = await message.populate("sender", "fullname email profileImage");
        message = await message.populate("chat");

        // Update chat with latest message
        await chatModel.findByIdAndUpdate(chatId, { latestMsg: message });

        // Fetch updated chat with latestMsg populated
        const updatedChat = await chatModel
            .findById(chatId)
            .populate("users", "fullname email coverImage") // Populate chat users
            .populate({
                path: "latestMsg",
                populate: { path: "sender", select: "fullname email coverImage" }, // Populate latestMsg sender
            });

        res.status(200).json({ message, updatedChat });
    } catch (error) {
        return res.status(400).json({ message: "Failed to send message", error });
    }
};

module.exports.getMessage = async (req, res) => {
    const { chatId } = req.body; // Extract chatId

    if (!chatId) {
        return res.status(400).json({ message: "chatId required" });
    }

    try {
        let messages = await messageModel
            .find({ chat: chatId }) // Match DB field
            .populate("sender", "fullname email coverImage") // Populate sender details
            .populate({
                path: "chat",
                populate: [
                    {
                        path: "users",
                        select: "fullname email coverImage", // Populate users in chat
                    },
                    {
                        path: "latestMsg",
                        populate: { path: "sender", select: "fullname email profileImage" }, // ✅ Ensure sender is populated inside latestMsg
                    },
                ],
            });

        res.status(200).json({ messages });
    } catch (error) {
        return res.status(400).json({ message: "Unable to fetch messages", error });
    }
};
