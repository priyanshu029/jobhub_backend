const User = require("../models/User");
const jwt = require("jsonwebtoken");

const varifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token,"jobhub2023",async(err,user)=>{
            if(err) res.status(403).json("Invalid token");

            req.user = user;

            console.log(user);

            next();
        });
    }else{
        return res.status(401).json("Your are not authenticated // No Token");
    }
}


const varifyAndAuthorization = (req, res, next)=>{
    varifyToken(req,res,()=>{
        if(req.user.id===req.params.id){
            console.log("varifyAndAuthorization }")
            next();
        }else{
            res.statua(403).json("Your are restricted from performing this task");
        }
    });
}

const varifyAndAdmin = (req, res, next)=>{
    varifyToken(req,res,()=>{
        console.log(req.user.isAdmin);
        if(req.user.isAdmin){
            next();
        }else{
            res.statua(403).json("Your are restricted from performing this task");
        }
    });
}


module.exports = {varifyToken, varifyAndAuthorization, varifyAndAdmin};
