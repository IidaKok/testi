const express = require("express");
const userControllers = require("../controllers/user-controller");


//creates route to users
const router = express.Router();

//get user
router.get("/", userControllers.getAllUsers);
router.get("/:username&:password", userControllers.getUserByNameAndPassword);

//get bookshelf
router.post("/createBookshelf/", userControllers.createBookShelf);

//post user
router.post("/post/", userControllers.createUser);

//delete user
router.delete("/delete/:username", userControllers.deleteUser);


//password change
router.get("/send-email", userControllers.email);
router.patch("/changePassword/:tokenfromUrl", userControllers.changePassword);

module.exports = router; 