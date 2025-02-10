const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bookController = require("../controllers/book.controller");
const bookModel = require("../models/book.model");

router.get("/", async (req, res) => {
  try {
    const books = await bookModel.find();
    
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.post("/upload", (req, res) => {
  bookController.uploadBook(req, res);
});



module.exports = router;
