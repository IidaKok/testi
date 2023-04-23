const express = require("express");
const bookControllers = require("../controllers/book-controller");

//creates route to books
const router = express.Router();

//get kutsu httplle
router.get("/", bookControllers.getAllBooks);
router.get("/:idbookseries", bookControllers.getBooksBySeriesID);

//post kutsu httplle
router.post("/", bookControllers.createBook);

//patch kutsu httplle
router.patch("/:idbook", bookControllers.updateBook);

//delete
router.delete("/:idbook", bookControllers.deleteBook);

module.exports = router; //vie appille