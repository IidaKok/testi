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
    catch (err) {
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
const updateBook = async (req, res, next) => {
    const { idbook } = req.params;
    const { bookname, publicationyear, description, idbookseries, seriesnumber, writer } = req.body;

    try {
        const seriesResult = await db.pool.query("SELECT idbookseries FROM bookseries WHERE idbookseries=?", [idbookseries]);

        if (seriesResult.length === 0) {
            const error = new HttpError(
                "Could not find a book series with the given id.",
                404
            );
            return next(error);
        }

        const result = await db.pool.query(
            "UPDATE book SET bookname=?, publicationyear=?, description=?, idbookseries=?, seriesnumber=?, writer=? WHERE idbook=?",
            [bookname, publicationyear, description, idbookseries, seriesnumber, writer, idbook]
        );

        if (result.affectedRows === 0) {
            const error = new HttpError(
                "Could not find a book with the given id.",
                404
            );
            return next(error);
        }

        res.status(200).json({ message: "Book updated successfully" });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Updating book failed, please try again!",
            500
        );
        return next(error);
    }
};

exports.getAllBooks = getAllBooks;
exports.getBooksBySeriesID = getBooksBySeriesID;
exports.createBook = createBook;
exports.updateBook = updateBook;