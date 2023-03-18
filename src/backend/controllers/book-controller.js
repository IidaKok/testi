const HttpError = require("../models/http-error");
const db = require("../db"); 

const getAllBooks = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from book");
        res.send(result);
    } catch (err) {
        throw err;
    }
}
const getBooksBySeriesID = async (req, res, next) => {
    try {
        const seriesId = parseInt(req.params.idbookseries);
        const result = await db.pool.query("select * from book");

        const book = result.filter(b => {
            return b.idbookseries === seriesId;
        });
        
        if (!book) { //handling error 
            return next(new HttpError("Can't find book", 404));
        }
        res.json({ book });
    }
    catch (err){
        throw err;
    }
}

exports.getAllBooks = getAllBooks;
exports.getBooksBySeriesID = getBooksBySeriesID;