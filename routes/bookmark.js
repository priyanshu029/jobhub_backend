const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const { varifyAndAuthorization, varifyToken, varifyAndAdmin } = require("../middleware/verifyToken");


// CREATE BOOKMARKS
router.post("/", varifyAndAuthorization, bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", varifyToken, bookmarkController.deleteBookmark);


// GET BOOKMARKS
router.get("/",varifyAndAuthorization, bookmarkController.getBookmark);



module.exports = router