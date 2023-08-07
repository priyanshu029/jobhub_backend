// module.exports = {
//     updateUser: async (req, res) => {

//     },


// }
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


module.exports = {
    createUser: async(req,res)=>{
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            //CryptoJS.AES.encrypt(req.body.password, process.env.SECRET)
            password:CryptoJS.AES.encrypt(req.body.password, "jobhub2023").toString()
        })
        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    loginUser: async(req,res)=>{
        try {
            const user = await User.findOne({email:req.body.email});
            !user && res.status(401).json("Wrong Login Details");// or no email found 

            const decryptedpass = CryptoJS.AES.decrypt(user.password, "jobhub2023");
            const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);

            console.log(depassword != req.body.password);
            depassword !== req.body.password && res.status(401).json("Wrong Password");

            const {password,__v, createdAt, ...others} =  user._doc;

            const userToken = jwt.sign({
                id:user._id, isAdmin: user.isAdmin, isAgent: user.isAgent
            },"jobhub2023",{expiresIn:"21d"})

            res.status(200).json({...others, userToken});

        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }
}