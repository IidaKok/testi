const HttpError = require("../models/http-error");
const BookCopy = require("../models/bookcopy");
const db = require("../db");

const getAllBookCopies = async (req, res, next) => {
    try {
        const bookCopies = await BookCopy.findAll();
        res.json({ bookCopies });
    } catch (err) {
        return next(new HttpError("Something went wrong, could not get book copies.", 500));
    }
};

const getBookCopiesByID = async (req, res, next) => {
    const copyId = parseInt(req.params.idbookcopy);
    try {
        const bookCopy = await BookCopy.findByPk(copyId);
        if (!bookCopy) {
            return next(new HttpError("Can't find book copy with the provided ID", 404));
        }
        res.json({ bookCopy });
    } catch (err) {
        return next(new HttpError("Something went wrong, could not get book copy.", 500));
    }
};

const createBookCopy = async (req, res, next) => {
    const {
      bookname,
      edition,
      publicationyear,
      idbook,
      purchaseprice,
      purchasedate,
      condition,
      description,
      solddate,
      soldprice,
      idbookseries,
      idbookshelf,
    } = req.body;
  
    try {
      const createdBookCopy = await BookCopy.create({
        bookname,
        edition,
        publicationyear,
        idbook,
        purchaseprice,
        purchasedate,
        condition,
        description,
        solddate,
        soldprice,
        idbookseries,
        idbookshelf,
      });
      res.status(201).json(createdBookCopy);
    } catch (err) {
      const error = new HttpError(
        "Creating copy failed, please try again!",
        500
      );
      return next(error);
    }
  };

exports.getAllBookCopies = getAllBookCopies;
exports.getBookCopiesByID = getBookCopiesByID;
exports.createBookCopy = createBookCopy;