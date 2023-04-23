const express = require("express");
const userseriesControllers = require("../controllers/userseries-controller");

//creates route to userseries
const router = express.Router();

//get
router.get("/", userseriesControllers.getAllUserSeries);
router.get("/:iduser", userseriesControllers.getUserSeriesByIdUser);

//post
router.post("/", userseriesControllers.createUserSeries);

module.exports = router; 