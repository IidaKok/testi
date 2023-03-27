const express = require("express");
const bookshelfControllers = require("../controllers/bookshelf-controller");

//creates route to users
const router = express.Router();


//get
router.get("/", bookshelfControllers.getAllBookShelfs);
router.get("/:iduser", bookshelfControllers.getBookShelfs);


module.exports = router;