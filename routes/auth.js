const router = require("express").Router();
const authContoller = require("../controllers/authContoller");
const authController = require("../controllers/authContoller");


// REGISTRATION 
router.post("/register", authContoller.createUser);

//login
router.post("/login", authContoller.loginUser);



// LOGIN 
// router.post("/login", authController.loginUser);


module.exports = router