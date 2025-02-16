const express = require("express");
const messageModel = require("../models/message.model");
const chatModel = require("../models/chat.model");
const authMiddleware = require("../middlewares/auth.middleware");
const messageController = require("../controllers/message.controller")

const router = express.Router();

router.post("/send",authMiddleware.findToken, messageController.sendMessage)
router.post("/get",authMiddleware.findToken, messageController.getMessage)

module.exports = router;
