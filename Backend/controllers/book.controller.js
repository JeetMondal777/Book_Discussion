
const bookModel = require("../models/book.model")
const userModel = require("../models/user")
const bookService = require("../services/book.service")
const {validationResult} = require("express-validator")
const blacklistTokenModel = require("../models/blacklistTokens.model")
const cloudinary = require("../cloudinary/cloudinary")


module.exports.uploadBook = async (req, res) => { 
    const errors = validationResult(req); // Check for validation errors

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return error if validation fails
    }

    const { coverImage, title, author, bookLink, description } = req.body; // Extract the fields
    const isBook = await bookModel.findOne({title})
    

    if(isBook) return res.status(400).json("Book Exists")

    
        // Create a new book using the book service
        const book = await bookService.createBook({
            uploadedBy: req.user._id, // Reference to the user who uploads the book
            coverImage,
            title,
            author,
            bookLink,
            description,
        });

        // Add the book's ObjectId to the user's books array
        await userModel.findByIdAndUpdate(req.user._id, {
            $push: { books: book._id } // Add the new book reference to the user's books array
        });

        // Return the newly created book
        res.status(201).json({ book });

        if(!book){
            return res.status(400).json({errors:errors.array()})
        }
    
};


    
