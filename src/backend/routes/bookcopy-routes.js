const express = require("express");
const bookcopyControllers = require("../controllers/bookcopy-controller");

//creates route to users
const router = express.Router();

//get kutsu httplle
router.get("/", bookcopyControllers.getAllBookCopies);
router.get("/:idbookcopy", bookcopyControllers.getBookCopiesByID);

//post kutsu httplle
router.post("/", bookcopyControllers.createBookCopy);

//post
router.post("/post/", bookcopyControllers.createUserBook);

module.exports = router; //vie appille