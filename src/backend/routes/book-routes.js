const express = require("express");
const bookControllers = require("../controllers/book-controller");

//creates route to users
const router = express.Router();

//get kutsu httplle
router.get("/", bookControllers.getAllBooks);
router.get("/:idbookseries", bookControllers.getBooksBySeriesID);

//post kutsu httplle
router.post("/", bookControllers.createBook);

//patch kutsu httplle
router.patch("/:idbook", bookControllers.updateBook);

module.exports = router; //vie appille