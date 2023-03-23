const express = require("express");
const bookControllers = require("../controllers/book-controller");

//creates route to books
const router = express.Router();


//get kutsu httplle
router.get("/", bookControllers.getAllBooks);
router.get("/:idbookseries", bookControllers.getBooksBySeriesID);

module.exports = router; //vie appille