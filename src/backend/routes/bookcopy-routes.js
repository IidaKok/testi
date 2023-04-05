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

router.put('/bookcopy/:idbookcopy', bookcopyControllers.updateBookCopy);

module.exports = router; //vie appille