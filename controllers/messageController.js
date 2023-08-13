const Message = require("../models/Message");
const User = require("../models/User")
const Chat = require("../models/Chat")


module.exports = {
    getAllMessages: async(req,res)=>{
        try {
            const pageSize =12;//number of message per page
            const page = req.query.page || 1; //current page number


            //calculate the number of message to skip
            const skipMessage = (page - 1)*pageSize;

            //Find message with pagination
            var messages = await Message.find({chat:req.params.id})
                .populate("sender","username profile email")
                .populate('chat')
                .sort({createdAt: -1}) //sort message by descending order
                .skip(skipMessage) //skip message based on pagination
                .limit(pageSize); //limit number of message per page
            
            messages = await User.populate(messages,{
                path:"chat.users",
                select:"username profile email"
            });

            return res.json(messages);
        } catch (error) {
            return res.status(500).json({"error":"Cant retrive messages"});
        }
    },


    sendMessages:async(req,res)=>{ 

        const {content, chatId, receiver} = req.body;

        if(!content || !chatId) {
            return res.status(400).json('Invalid data');
        }

        var newMessage = {
             sender:req.user.id,
             content:content,
             receiver: receiver,
             chat:chatId 
        }


        try {
            var message = await Message.create(newMessage);
            message = await message.populate("sender","username profile email");
            message = await message.populate("chat");
            message = await User.populate(message,{path:"Chat.users",select:"username profile email"});


            await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});


            return res.status(200).json(message);
        } catch (error) {
            res.status(400).json({"error":error});
        }
    }
}