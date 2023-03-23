const express = require("express");
const seriesControllers = require("../controllers/series-controller");

//creates route to series
const router = express.Router();


//get kutsu httplle
router.get("/", seriesControllers.getAllSeries);
router.get("/:idbookseries", seriesControllers.getSeriesByName);

module.exports = router; //vie appille user