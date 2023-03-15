const express = require("express");
const userControllers = require("../controllers/series-controller");

//creates route to users
const router = express.Router();


//get kutsu httplle
router.get("/", userControllers.getAllSeries);
router.get("/:idbookseries", userControllers.getSeriesByName);

module.exports = router; //vie appille