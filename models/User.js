const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {

    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    phone:{type:String,required:true,unique:true},
    password: {type: String, required:true},
    location: {type:String, required:false},
    isAdmin: {type:Boolean, default:false},
    isAgent: {type:Boolean, default:false},
    skills: {type:Array, default:false},
    profile: {type:String, required:true, default:"https://www.shutterstock.com/shutterstock/photos/229692004/display_1500/stock-vector-man-avatar-profile-picture-vector-illustration-eps-229692004.jpg"},
    },{timestamps:true}
);


module.exports = mongoose.model("User",UserSchema);