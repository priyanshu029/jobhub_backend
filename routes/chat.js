const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { varifyAndAuthorization, varifyToken, varifyAndAdmin } = require("../middleware/verifyToken");


//create chat
router.post("/",varifyAndAuthorization,chatController.accessChat)


//get chat
router.get("/",varifyAndAuthorization, chatController.getChat)






module.exports = router