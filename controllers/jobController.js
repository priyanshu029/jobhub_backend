const Job = require("../models/Job")



module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body);

        try {
            const savedJob = await newJob.save();
            const {__v, createdAt, updatedAt, ...newJobInfo} = savedJob._doc; 

            console.log("New Job added");
            res.status(201).json(newJobInfo);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    updateJob: async (req, res) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
            
            const {__v, createdAt, updatedAt, ...updatedJobInfo} = updatedJob._doc; 

            console.log("Updated Job added");
            res.status(200).json(updatedJobInfo);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id);
            console.log("Job deleted");
            res.status(200).json("Job deleted");
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getJob: async (req, res) => { 
        try {
            const getJob = await Job.findById(req.params.id);

            const {__v, createdAt, updatedAt, ...getJobData} = getJob._doc;
            
            console.log(getJobData);
            res.status(200).json(getJobData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getAllJob: async (req, res) => {
        try {
            const allJob = await Job.find();
            console.log(allJob);
            res.status(200).json(allJob);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    
    searchJobs: async (req, res) => {
        try {
            const results = await Job.aggregate(
                [
                {
                    $search: {
                      index: "jobsearch",
                      text: {
                        query: req.params.key,
                        path: {
                          wildcard: "*"
                        }
                      }
                    }
                  }
                ]
            );
            console.log(results);
            res.status(200).json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

}