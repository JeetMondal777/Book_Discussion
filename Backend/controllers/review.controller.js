const reviewModel = require('../models/review.model');
const { validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const bookModel = require("../models/book.model")

// Controller for sending a new review
module.exports.sendReview = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array()
        });
    }

    try {
        const { content, bookId, rating } = req.body;
        const senderId = req.user._id; // Assuming user is authenticated and attached to request
        console.log(content, bookId, senderId);
        

        // Basic validation
        if (!content || !bookId) {
            return res.status(400).json({
                
                message: 'Missing required fields: content and bookId and rating'
            });
        }

        const isBook = await bookModel.findById(bookId);
        if(!isBook) return res.status(400).json("Book does not exist")

            

        const newReview = await reviewModel.create({
            sender: senderId,
            content,
            bookId,
            rating
        });

        await bookModel.findByIdAndUpdate(bookId, {
            $push: { reviews: newReview._id }
        });

        
        // Populate sender details excluding sensitive information
        await newReview.populate({
            path: 'sender',
            select: 'fullname email coverImage' // Adjust fields based on your User model
        })
        await newReview.populate({
            path:"bookId",
            select:"title coverImage author"
        })

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: newReview
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: ' Internal Server error',
            error: error.message
        });
    }
};

// Controller for getting reviews for a specific book
module.exports.getReview = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array()
        });
    }
    try {
        const { bookId } = req.params;

        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: 'Book ID is required'
            });
        }

        const isBook = await bookModel.findById(bookId)
        if(!isBook) return res.status(400).json("Book does not exist")

        const reviews = await reviewModel.find({ bookId })
            .sort({ createdAt: -1 }) // Newest first
            .populate({
                path: 'sender',
                select: 'fullname email coverImage' // Customize fields as needed
            }).populate({
                path:"bookId",
                select:"title coverImage author"
            })
            console.log(reviews);
            

        res.status(200).json({
            success: true,
            message: 'Reviews retrieved successfully',
            data: reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server error',
            error: error.message
        });
    }
};
