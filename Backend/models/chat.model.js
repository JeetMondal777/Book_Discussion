const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    latestMsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const chatModel = mongoose.model("chat", chatSchema);
module.exports = chatModel;
