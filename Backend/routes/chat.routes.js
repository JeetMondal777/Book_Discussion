const express = require("express");
const chatModel = require("../models/chat.model");
const chatController = require("../controllers/chat.controller")
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();



router.post("/create", authMiddleware.findToken, chatController.accessChat);

router.get("/fetchChats", authMiddleware.findToken, chatController.fetchChats)

router.post("/createGroup", authMiddleware.findToken, chatController.createGroupChat)

router.put("/addToGroup", authMiddleware.findToken, chatController.addToGroup)



module.exports = router;
