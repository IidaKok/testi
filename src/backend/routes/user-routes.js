const express = require("express");
const userControllers = require("../controllers/user-controller");


//creates route to users
const router = express.Router();

//get user
router.get("/all", userControllers.getAllUsers);
router.get("/:username&:password", userControllers.getUserByNameAndPassword);

//post user
router.post("/post/", userControllers.createUser);

//delete user
router.delete("/delete/:username", userControllers.deleteUser);


//password change
router.get("/send-email", userControllers.email);
router.patch("/changePassword/:tokenfromUrl", userControllers.changePassword);

//user login
router.get("/", userControllers.islogged);
router.post("/login", userControllers.login);
router.post("/logout", userControllers.logout);

module.exports = router; 