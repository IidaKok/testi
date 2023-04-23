const express = require("express");
const artworkControllers = require("../controllers/artwork-controller");

//creates route to artwork
const router = express.Router();

// get
router.get("/", artworkControllers.getAllArtwork);
router.get("/:idbook", artworkControllers.getArtworkByIdbook);

// post
router.post("/", artworkControllers.createArtwork);

// delete
router.delete("/:idpicture", artworkControllers.deleteArtwork);
router.delete("/:idbook", artworkControllers.deleteArtworkByIdBook);


module.exports = router; 