const express = require("express");
const userControllers = require("../controllers/user-controller");

//creates route to users
const router = express.Router();


//get kutsu httplle
router.get("/", userControllers.getAllUsers);
router.get("/:username", userControllers.getUserByName);

module.exports = router; //vie appille