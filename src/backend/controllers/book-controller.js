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
const createBook = async (req, res, next) => {
    const {
        bookname,
        publicationyear,
        description,
        idbookseries,
        seriesnumber,
        writer,
    } = req.body;

    try {
        await db.pool.query(
            "INSERT INTO book (bookname, publicationyear, description, idbookseries, seriesnumber, writer) VALUES (?, ?, ?, ?, ?, ?)",
            [
                bookname,
                publicationyear,
                description,
                idbookseries,
                seriesnumber,
                writer,
            ]
        );

        res.status(201).json({ message: "Book created successfully" });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Creating book failed, please try again!",
            500
        );
        return next(error);
    }
};

exports.getAllBooks = getAllBooks;
exports.getBooksBySeriesID = getBooksBySeriesID;
exports.createBook = createBook;