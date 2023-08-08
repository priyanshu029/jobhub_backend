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

dotenv.config()  //process.env.VARIABLE_NAME
const mongo_url = "mongodb+srv://jobhub:jobhub@jobhubdb.xwiasdt.mongodb.net/";
mongoose.connect(mongo_url).then(()=>console.log('db connected')).catch((err)=>console.log(err));


app.use(express.json());
app.use("/api",authRoute);//localhost:5000/api/register
app.use("/api/users",userRoute);//localhost:/api/users/id
app.use("/api/jobs",jobRoute);//localhost:/api/jobs/id
app.use("/api/bookmarks",bookmarkRoute)



app.get('/', (req, res) => {res.send('Hello Priyanshu!')});
app.listen(port || 4000, () => console.log(`Example app listening on port ${port}!`))