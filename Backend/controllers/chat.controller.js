const {validationResult} = require("express-validator")
const chatModel = require("../models/chat.model")
//const chatService = require("../services/chat.service")
const userModel = require("../models/user")




// module.exports.accessChat = async(req,res)=>{

//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

    

//     const { userId } = req.body // i get chat id here 
//     if(!userId){
//         return res.status(400).json({error:"Invalid Credintials"})
//     }
    
//     let isChat = chatModel.find({                // chatModel.findById(chatId)
//         $and:[
//             {users:{$elemMatch : {$eq : req.user._id}}},
//             {users:{$elemMatch : {$eq : userId}}}
//         ]
//     }).populate("users").populate("latestMsg")

//     isChat = await userModel.populate(isChat, {    // chatModel.findByIdAnd Update(chatId,{$push:{ users: req.user._id},})
//         path:"latestMsg.sender",
//         select:"fullname email"
//     })

//     if(isChat.length>0){
//         res.send(isChat[0])
//     }else{
//         let chatData = {
//             chatName:"sender",     //bookname
//             users:[req.user._id,userId], //req.user._id and chatAdmin
//         }
    

//     try {
//         const createdChat = await chatModel.create(chatData)

//         const FullChat = await chatModel.find({_id:createdChat._id}).populate("users")

//         res.status(200).send(FullChat)
//     } catch (error) {
//         res.status(400)
//         throw new Error(error.message)
        
//     }

// }
    
// }

module.exports.createGroupChat = async(req,res)=>{
    if(!req.body.title){
        res.status(400).send({message:"Please enter title."})
    }

    const {title} = req.body

    // const isChatExist = chatModel.findOne({_id:chatId})

    // if(isChatExist){
    //     return res.status(400).send({error:"Chat already exist."})
    // }

    const admin = req.user
    

    let users = []
    
    if(admin){
        users.push(admin)
    }

    try {
        const groupChat = await chatModel.create({
            title:title,
            users:users,
            groupAdmin:admin._id
        })

        const fullGroupChat = await chatModel.findOne({_id:groupChat._id})
        .populate("users").populate("groupAdmin")

        res.status(201).json(fullGroupChat)

    } catch (error) {
        return res.status(400).send({message:errors.array()})
    }
}

module.exports.fetchChats = async (req, res) => {
    try {
        const { chatTitle } = req.body; 

        // Fetch chats for the given chatId (book discussion room)
        let results = await chatModel.find({ title:chatTitle })
            .populate("users")
            .populate("groupAdmin")
            .populate({
                path: "latestMsg",
                populate: {
                    path: "sender",
                    model: "user", // Ensure it matches your user model name
                }
            })
            .sort({ updatedAt: -1 });

           
            

        // Send response
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(400).json({ message: error.message });
    }
};


module.exports.addToGroup = async(req,res)=>{
   const {chatId} = req.body
   const user = req.user
   



    const added = await chatModel.findOneAndUpdate({_id:chatId},{
        $push:{ users: user._id},
        
    },{new:true}).populate("users").populate("groupAdmin")

    

    if(!added){
        res.status(404).send({message:"Failed to add user to the group.", error})
    }

    res.status(201).json(added.toObject({ getters: true }));
}
