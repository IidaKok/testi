const HttpError = require("../models/http-error");
const db = require("../db");

const getAllPictures = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from picture");
        res.send(result);
    } catch (err) {
        throw err;
    }
};

const getPictureById = async (req, res, next) => {
    try {
        const idpicture = req.params.idpicture;
        const result = await db.pool.query("select * from picture where idpicture = ?", [idpicture]);

        if (!result) { //handling error 
            return next(new HttpError("Can't find picture", 404));
        }
        res.json(result);
    }
    catch (err) {
        throw err;
    }
};

const createPicture = async (req, res, next) => {
    const {
        picturename,
        publicationyear,
        artist,
        style,
        description,
        filename,
    } = req.body;

    try {
        await db.pool.query(
            "INSERT INTO picture (picturename, publicationyear, artist, style, description, filename) VALUES (?, ?, ?, ?, ?, ?)",
            [
                picturename,
                publicationyear,
                artist,
                style,
                description,
                filename,
            ]
        );

        res.status(201).json({ message: "Picture created successfully" });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Creating picture failed, please try again!",
            500
        );
        return next(error);
    }
};
const updatePicture = async (req, res, next) => {
    const { idpicture } = req.params;
    const {
        picturename,
        publicationyear,
        artist,
        style,
        description,
        filename,
    } = req.body;

    try {
        const result = await db.pool.query(
            "UPDATE picture SET picturename=?, publicationyear=?, artist=?, style=?, description=?, filename=? WHERE idpicture=?",
            [picturename, publicationyear, artist, style, description, filename, idpicture]
        );

        if (result.affectedRows === 0) {
            const error = new HttpError(
                "Could not find a picture with the given id.",
                404
            );
            return next(error);
        }

        res.status(200).json({ message: "Picture updated successfully" });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Updating picture failed, please try again!",
            500
        );
        return next(error);
    }
};

exports.getPictureById = getPictureById;
exports.getAllPictures = getAllPictures;
exports.createPicture = createPicture;
exports.updatePicture = updatePicture;