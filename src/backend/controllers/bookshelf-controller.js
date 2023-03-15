const HttpError = require("../models/http-error");
const db = require("../db");



const getAllBookShelfs = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from bookshelf");
        res.send(result);
    } catch (err) {
        throw err;
    }
}

const getBookShelfs = async (req, res, next) => {
    try {
        const iduser = req.params.iduser;
        const result = await db.pool.query("select * from bookshelf");

        const bookshelf = result.find(b => {
            return b.iduser == iduser;
        });
        
        if (!bookshelf) { //handling error
            return next(new HttpError("Can't find bookshelf", 404));
        }
        res.json( bookshelf );
    }
    catch (err){
        throw err;
    }
}
exports.getBookShelfs = getBookShelfs;
exports.getAllBookShelfs = getAllBookShelfs;