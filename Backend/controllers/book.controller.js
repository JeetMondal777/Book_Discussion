
const bookModel = require("../models/book.model")
const bookService = require("../services/book.service")
const {validationResult} = require("express-validator")
const blacklistTokenModel = require("../models/blacklistTokens.model")
const cloudinary = require("../cloudinary/cloudinary")


module.exports.uploadBook = async(req,res)=>{ 
    const errors = validationResult(req) //contain errors onlyz

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}) //return error
    }

    const{coverImage, title, author, bookLink, description}= req.body  //  user = req.user
    
    
    const book = await bookService.createBook({
        uploadedBy : req.user,
        coverImage,
        title,
        author,
        bookLink,
        description
        
    })

    res.status(201).json({ book})
}

    
