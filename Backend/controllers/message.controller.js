const {validationResult} = require("express-validator")
const messageModel = require("../models/message.model")
const chatModel = require("../models/chat.model")
const userModel = require("../models/user")


module.exports.sendMessage = async(req,res)=>{
    const errors = validationResult(req)

    if(errors.array>0){
        return res.status(400).json({errors:errors.array})
    }

    const {content, chatId} = req.body

    if(!content||!chatId){
        return res.status(400).json({message:"content and chatId are required"})
    }

    const newMessage = {
        sender:req.user,
        content,
        chat:chatId
    }

    let message = await messageModel.create(newMessage)
    message = await message.populate("chat")
    message = await userModel.populate(message,{
        path:"chat.users",
        select:"fullname email"
    })

        await chatModel.findByIdAndUpdate(req.body.chatId,{
            latestMsg:message,
    
    
        })

res.status(200).json(message);


    if(!message){
        return res.status(400).json({message:"Failed to send message"})
    }

}