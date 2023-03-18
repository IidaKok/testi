const express = require("express");
const bookControllers = require("../controllers/book-controller");

//creates route to users
const router = express.Router();


//get kutsu httplle
router.get("/", bookControllers.getAllBooks);
router.get("/:idbook", bookControllers.getBooks);

module.exports = router; //vie appille