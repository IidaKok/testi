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
        res.json( result );
    }
    catch (err){
        throw err;
    }
};


exports.getAllArtwork = getAllArtwork;
exports.getArtworkByIdbook = getArtworkByIdbook;