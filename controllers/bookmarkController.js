const Bookmarks = require("../models/Bookmark");
const Job = require("../models/Job");


module.exports = {
    createBookmark : async (req, res) => {
        
        const jobId = req.body.job;

        try {
            const job = await Job.find(jobId);
            if(!job){
                res.status(404).json({error:"Job not found"});
            }
            const newBookmark = new Bookmarks({job:job,userId:req.user.id});

            const savedBookmark =await newBookmark.save();
          
            const {__v, createdAt, updatedAt, ...newBookmarksInfo} = savedBookmark._doc; 

            console.log("New Bookmark added");
            res.status(201).json(newBookmarksInfo);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    deleteBookmark : async (req, res) => {
        try {
            await Bookmarks.findByIdAndDelete(req.params.id);
            console.log("Bookmark deleted");
            res.status(200).json("Bookmark deleted");
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getBookmark : async (req, res) => {
        try {
            const bookmarks = await Bookmarks.find({userId:req.params.userId});
            console.log(bookmarks);
            res.status(200).json(bookmarks);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },


}