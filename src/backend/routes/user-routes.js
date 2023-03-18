

const express = require("express");
const userControllers = require("../controllers/user-controller");



//creates route to users
const router = express.Router();


//get
//router.get("/", userControllers.getAllUsers);
router.route("/").get(userControllers.getAllUsers).post(userControllers.createUser);
router.get("/:username&:password", userControllers.getUserByName);


module.exports = router; //vie appille