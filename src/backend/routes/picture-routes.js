const express = require("express");
const pictureControllers = require("../controllers/picture-controller");

//creates route to pictures
const router = express.Router();

// get
router.get("/", pictureControllers.getAllPictures);
router.get("/:idpicture", pictureControllers.getPictureById);


module.exports = router; 