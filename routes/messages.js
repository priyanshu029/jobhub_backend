const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { varifyAndAuthorization, varifyToken, varifyAndAdmin } = require("../middleware/verifyToken");


//create message
router.post("/",varifyAndAuthorization,messageController.sendMessages)


//get all message
router.get("/:id",varifyAndAuthorization, messageController.getAllMessages)//chatId



module.exports = router