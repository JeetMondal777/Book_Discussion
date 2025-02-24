const express = require("express")
const router = express.Router();
const {body} = require("express-validator")
const reviewController = require("../controllers/review.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/sendReview", authMiddleware.findToken, reviewController.sendReview)

router.get("/getReview/:bookId", authMiddleware.findToken, reviewController.getReview)

module.exports = router