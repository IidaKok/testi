const express = require("express");
const bookcopyControllers = require("../controllers/bookcopy-controller");

//creates route to users
const router = express.Router();

//get kutsu httplle
router.get("/", bookcopyControllers.getAllBookCopies);
router.get("/:idbookshelf", bookcopyControllers.getBookCopiesByShelfID);

//post kutsu httplle
router.post("/", bookcopyControllers.createBookCopy);

//post
router.post("/post/", bookcopyControllers.createUserBook);

//delete
router.delete('/:idbookcopy', bookcopyControllers.deleteBookcopy);

//update
router.put('/:idbookcopy', bookcopyControllers.updateBookcopy);

module.exports = router; //vie appille