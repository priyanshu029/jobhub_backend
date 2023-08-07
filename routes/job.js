const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { varifyAndAuthorization, varifyToken, varifyAndAdmin } = require("../middleware/verifyToken");


// Post Job 
router.post("/",varifyAndAdmin, jobController.createJob);

// Update Job
router.put("/:id",varifyAndAdmin, jobController.updateJob);

// Delete Job
router.delete("/:id",varifyAndAdmin, jobController.deleteJob);

// Get Job
router.get("/:id", jobController.getJob);

// Get All Job
router.get("/", jobController.getAllJob);

// Search Job
router.get("/search/:key", jobController.searchJobs);


module.exports = router