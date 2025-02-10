const bookModel = require("../models/book.model")

module.exports.createBook = async({coverImage, uploadedBy, title, author, bookLink, description})=>{ //uploadedBy
    if(!title || !author || !bookLink  ||!coverImage || !description ){
        throw new Error("All Fields Are Required")
    }else{
        const book = bookModel.create({
            // uploadedBy,
            coverImage,
            title,
            author,
            bookLink,
            description
            
        })
        return book
    }
}

// here we are creating the user if we achive our requirements whenever we call it