const express = require("express");
const userControllers = require("../controllers/user-controller");


//creates route to users
const router = express.Router();

//get
router.get("/", userControllers.getAllUsers);
router.get("/:username&:password", userControllers.getUserByNameAndPassword);


//post
router.post("/post/", userControllers.createUser);

//delete
router.delete("/delete/:username", userControllers.deleteUser);

module.exports = router; 