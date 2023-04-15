const HttpError = require("../models/http-error");
const db = require("../db");

const getAllPictures = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from picture");
        res.send(result);
    } catch (err) {
        throw err;
    }
}

const getPictureById = async (req, res, next) => {
    try {
        const idpicture = req.params.idpicture;
        const result = await db.pool.query("select * from picture where idpicture = ?", [idpicture]);
        
        if (!result) { //handling error 
            return next(new HttpError("Can't find picture", 404));
        }
        res.json( result );
    }
    catch (err){
        throw err;
    }
};

exports.getPictureById = getPictureById;
exports.getAllPictures = getAllPictures;