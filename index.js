const express = require('express')
const app = express()
// const port = 3000
const port = process.env.PORT;


const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const bookmarkRoute = require("./routes/bookmark");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/messages");

dotenv.config()  //process.env.VARIABLE_NAME
const mongo_url = "mongodb+srv://jobhub:jobhub@jobhubdb.xwiasdt.mongodb.net/";
mongoose.connect(mongo_url).then(()=>console.log('db connected')).catch((err)=>console.log(err));


app.use(express.json());
app.use("/api",authRoute);//localhost:5000/api/register
app.use("/api/users",userRoute);//localhost:/api/users/id
app.use("/api/jobs",jobRoute);//localhost:/api/jobs/id
app.use("/api/bookmarks",bookmarkRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);



app.get('/', (req, res) => {res.send('Hello Priyanshu!')});
const server = app.listen(port || 4000, () => console.log(`Example app listening on port ${port}!`));

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        //localhost
        // origin: "http:localhost:4000",
        //hostedorigin
        origin:"https://jobhubbackend-production-8a84.up.railway.app/"
    }
});

io.on("connection",(socket)=>{
    console.log("connected to socket");

    socket.on('setup',(userId)=>{
        socket.join(userId);
        socket.broadcast.emit('online-user',userId);
        console.log(userId);
    });

    socket.on('typing',(room)=>{
        console.log('typing in room');

        socket.to(room).emit('typing',room)
    });

    socket.on('stop typing',(room)=>{
        console.log('stop typing in room');

        socket.to(room).emit('stop typing',room);
    });

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log('user joined'+room);
    });

    socket.on('new  message',(newMessageReceived)=>{
        var chat = newMessageReceived.chat;
        var room = newMessageReceived._id;

        var sender = newMessageReceived.sender;

        if(!sender || sender._id){
            console.log('sender not defined');
            return
        }
        
        var senderId = sender._id;

        console.log("message sender"+senderId);

        const users = chat.users;

        if(!users){
            console.log('User not defined');
            return
        }

        socket.to(room).emit("message received",newMessageReceived);
        socket.to(room).emit('message sent', 'New Message');
    });

    socket.off('setup',()=>{
        console.log('user offline');
        socket.leave(userId);
    });

});