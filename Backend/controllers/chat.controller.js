const {validationResult} = require("express-validator")
const chatModel = require("../models/chat.model")
//const chatService = require("../services/chat.service")
const userModel = require("../models/user")




module.exports.accessChat = async(req,res)=>{

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    

    const { userId } = req.body // i get chat id here 
    if(!userId){
        return res.status(400).json({error:"Invalid Credintials"})
    }
    
    let isChat = chatModel.find({                // chatModel.findById(chatId)
        $and:[
            {users:{$elemMatch : {$eq : req.user._id}}},
            {users:{$elemMatch : {$eq : userId}}}
        ]
    }).populate("users").populate("latestMsg")

    isChat = await userModel.populate(isChat, {    // chatModel.findByIdAnd Update(chatId,{$push:{ users: req.user._id},})
        path:"latestMsg.sender",
        select:"fullname email"
    })

    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        let chatData = {
            chatName:"sender",     //bookname
            users:[req.user._id,userId], //req.user._id and chatAdmin
        }
    

    try {
        const createdChat = await chatModel.create(chatData)

        const FullChat = await chatModel.find({_id:createdChat._id}).populate("users")

        res.status(200).send(FullChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
        
    }

}
    
}

module.exports.createGroupChat = async(req,res)=>{
    if(!title|| !req.body._id || !req.body.adminId){
        res.status(400).send({message:"Please enter all fields."})
    }

    const isChatExist = chatModel.findOne({_id:req.body._id})

    if(isChatExist){
        return res.status(400).send({error:"Chat already exist."})
    }
    

    let users = []
    const admin = await userModel.findById(req.body.adminId)

    
    if(admin){
        users.push(admin)
        users.push(req.user)
    }

    try {
        const groupChat = await chatModel.create({
            title:req.body.title,
            users:users,
            groupAdmin:admin._id
        })

        const fullGroupChat = await chatModel.findOne({_id:groupChat._id})
        .populate("users").populate("groupAdmin")

        res.status(201).json(fullGroupChat)

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
}

module.exports.fetchChats = async(req,res)=>{
    try {
        chatModel.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users").populate("groupAdmin").populate("latestMsg")
        .sort({ updatedAt:-1}).then(async(results)=>{
            results = await userModel.populate(results, {
                path:"latestMsg.sender",
                select:"fullname email"
            })
            res.status(200).send(results)
        })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
}

module.exports.addToGroup = async(req,res)=>{
    const {_id, userId} = req.body


    const added = chatModel.findOneAndUpdate({_id:_id},{
        $push:{ users: req.user},
        
    },{new:true}).populate("users").populate("groupAdmin")

    if(!added){
        res.status(404).send({message:"Failed to add user to the group."})
    }

    res.status(201)
}
