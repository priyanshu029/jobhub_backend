const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    chatName:{type:String, trim:true},
    isGroup: {type: Boolean, default:false},
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    latestMessage:{type:mongoose.Schema.ObjectId,ref:"Message"},
    groupAdmin:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    
},{timestamps:true});

module.exports = mongoose.model("Chat",chatSchema);
