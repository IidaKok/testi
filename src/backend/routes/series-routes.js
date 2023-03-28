const express = require("express");
const userControllers = require("../controllers/series-controller");

//creates route to users
const router = express.Router();


//get kutsu httplle
router.get("/", userControllers.getAllSeries);
router.get("/:idbookseries", userControllers.getSeriesByName);

//post
router.post("/post/", userControllers.createSeries);

module.exports = router; //vie appille