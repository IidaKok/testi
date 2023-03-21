const HttpError = require("../models/http-error");
const db = require("../db");

const getAllBookCopies = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from bookcopy");
        res.send(result);
    } catch (err) {
        throw err;
    }
}
const getBookCopiesByID = async (req, res, next) => {
    try {
        const copyId = parseInt(req.params.idbookcopy);
        const result = await db.pool.query("select * from bookcopy");

        const bookcopy = result.filter(b => {
            return b.idbookcopy === copyId;
        });

        if (!bookcopy) { //handling error 
            return next(new HttpError("Can't find book", 404));
        }
        res.json({ bookcopy });
    }
    catch (err) {
        throw err;
    }
}

exports.getAllBookCopies = getAllBookCopies;
exports.getBookCopiesByID = getBookCopiesByID;