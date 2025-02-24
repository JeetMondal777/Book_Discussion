const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to a User model
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000 // Adjust as needed
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book', // Reference to a Book model (if you have one)
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});


const review = mongoose.model('review', reviewSchema);

module.exports = review;