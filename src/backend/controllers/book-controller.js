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

const getBooks = async (req, res, next) => {
    try {
        const idbook = req.params.idbook;
        const result = await db.pool.query("select * from book");

        const book = result.find(b => {
            return b.idbook == idbook;
        });

        if (!book) { //handling error
            return next(new HttpError("Can't find books", 404));
        }
        res.json(book);
    }
    catch (err) {
        throw err;
    }
}
exports.getBooks = getBooks;
exports.getAllBooks = getAllBooks;