const express = require("express");
const photoControllers = require("../controllers/photo-controller");

//creates route to users
const router = express.Router();

//get kutsu httplle
router.get("/", photoControllers.getAllBookCopyPhoto);
router.get("/:idbookcopy", photoControllers.getAllBookCopyPhotos);

//post kutsu httplle
router.post("/post/", photoControllers.createUserPhoto);

//update
router.put('/:idbookcopy', photoControllers.updateBookPhoto);

//delete
router.delete('/:idbookcopy', photoControllers.deleteBookPhoto);


module.exports = router; //vie appille