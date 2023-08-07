const User = require("../models/User");
const CryptoJS = require("crypto-js");





module.exports = {
    updateUser: async (req, res) => {
        if(req.body.password){
            req.body.password = CryptoJS.encrypt(req.body.password,"jobhub2023").toString();
        }
        

        try {
            console.log("updateUser");
            const UpdateUser = await User.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body
                },{new:true}
            );
            console.log("updateUser01");
            const {password,__v, createdAt, ...others} =  UpdateUser._doc;
            console.log("updateUser02");
            
            res.status(200).json({...others});
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Successfully Deleted");
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;

            res.status(200).json(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getAllUser: async (req, res) => {
        try {
            const allUser = await User.find();

            res.status(200).json(allUser);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

}