const express = require("express");
const userControllers = require("../controllers/book-controller");

//creates route to users
const router = express.Router();


//get kutsu httplle
router.get("/", userControllers.getAllBooks);
router.get("/:idbookseries", userControllers.getBooksBySeriesID);

module.exports = router; //vie appille