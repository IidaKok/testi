const express = require("express");
const seriesControllers = require("../controllers/series-controller");

//creates route to users
const router = express.Router();

//get kutsu httplle
router.get("/", seriesControllers.getAllSeries);
router.get("/:idbookseries", seriesControllers.getSeriesByName);

//post
router.post("/", seriesControllers.createSeries);

//patch
router.patch("/:idbookseries", seriesControllers.updateSeries)

module.exports = router; //vie appille