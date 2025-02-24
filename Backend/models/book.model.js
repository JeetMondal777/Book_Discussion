const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    author:{
        type:String,
        required:true,

    },
    bookLink:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,

    },
    coverImage:{
        type:String,
        required:true
    },
    reviews:{
        type:Array,
        default:[]
    },
    uploadedBy:{
        type:String,
        
    }
}, {timestamps:true})

const bookModel = mongoose.model("book", bookSchema)
module.exports = bookModel