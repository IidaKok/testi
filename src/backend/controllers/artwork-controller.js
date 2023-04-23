const HttpError = require("../models/http-error");
const db = require("../db");

const getAllArtwork = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from artwork");
        res.send(result);
    } catch (err) {
        throw err;
    }
};

const getArtworkByIdbook = async (req, res, next) => {
    try {
        const idbook = req.params.idbook;
        const result = await db.pool.query("select * from artwork where idbook = ?", [idbook]);

        if (!result) { //handling error 
            return next(new HttpError("Can't find artwork", 404));
        }
        res.json(result);
    }
    catch (err) {
        throw err;
    }
};

const createArtwork = async (req, res, next) => {
    const {
        idbook,
        idpicture,
        pagenumber,
    } = req.body;

    try {
        await db.pool.query(
            "INSERT INTO artwork (idbook, idpicture, pagenumber) VALUES (?, ?, ?)",
            [
                idbook,
                idpicture,
                pagenumber,
            ]
        );

        res.status(201).json({ message: "Artwork created successfully" });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Creating artwork failed, please try again!",
            500
        );
        return next(error);
    }
};

const deleteArtwork = async (req, res, next) => {
    const idpicture = req.params.idpicture;
    try {
        const response = await db.pool.query("DELETE FROM artwork WHERE idpicture = " + idpicture);
        if (response.affectedRows == 0) {
            res.status(404).json({ message: "Artwork not found" });
        } else {
            res.json({ message: "Artwork with idpicture = " + idpicture + " was deleted from the database" });
            console.log("Artwork with idpicture = " + idpicture + " was deleted from the database");
        }
    }
    catch (err) {
        throw err;
    }
};

const deleteArtworkByIdBook = async (req, res, next) => {
    const idbook = req.params.idbook;
    try {
        const response = await db.pool.query("DELETE FROM artwork WHERE idbook = " + idbook);
        if (response.affectedRows == 0) {
            res.status(404).json({ message: "Artwork with idbook = " + idbook + " not found" });
        } else {
            res.json({ message: "Artwork with idbook = " + idbook + " was deleted from the database" });
            console.log("Artwork with idbook = " + idbook + " was deleted from the database");
        }
    }
    catch (err) {
        throw err;
    }
};


exports.getAllArtwork = getAllArtwork;
exports.getArtworkByIdbook = getArtworkByIdbook;
exports.createArtwork = createArtwork;
exports.deleteArtwork = deleteArtwork;
exports.deleteArtworkByIdBook = deleteArtworkByIdBook;