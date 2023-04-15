const express = require("express");
const artworkControllers = require("../controllers/artwork-controller");

//creates route to pictures
const router = express.Router();

// get
router.get("/", artworkControllers.getAllArtwork);
router.get("/:idbook", artworkControllers.getArtworkByIdbook);


module.exports = router; 