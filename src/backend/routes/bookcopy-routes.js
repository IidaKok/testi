const express = require("express");
const userControllers = require("../controllers/bookcopy-controller");

//creates route to users
const router = express.Router();


//get kutsu httplle
router.get("/", userControllers.getAllBookCopies);
router.get("/:idbookcopy", userControllers.getBookCopiesByID);

//post
router.post("/post/", userControllers.createUserBook);

module.exports = router; //vie appille