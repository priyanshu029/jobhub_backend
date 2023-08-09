const router = require("express").Router();
const userController = require("../controllers/userController");
const { varifyAndAuthorization, varifyToken, varifyAndAdmin } = require("../middleware/verifyToken");


// Update user 
router.put("/",varifyAndAuthorization, userController.updateUser);

// Delete User
router.delete("/",varifyAndAuthorization, userController.deleteUser);

// Get User
router.get("/",varifyAndAuthorization, userController.getUser);

// Get All User
router.get("/",varifyAndAdmin, userController.getAllUser);


module.exports = router