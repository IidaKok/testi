const HttpError = require("../models/http-error");
const db = require("../db");

const getAllBookCopies = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from bookcopy");
        res.send(result);
    } catch (err) {
        throw err;
    }
};

const getBookCopiesByShelfID = async (req, res, next) => {
    try {
        const idbookshelf = req.params.idbookshelf;
        const result = await db.pool.query("select * from bookcopy where idbookshelf = ?", [idbookshelf]);

        if (result.length === 0) { //handling error
            return next(new HttpError("Can't find bookshelf", 404));
        }

        res.json(result);
    }
    catch (err) {
        throw err;
    }
}
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
    await db.pool.query(
      "INSERT INTO bookcopy (bookname, edition, publicationyear, idbook, purchaseprice, purchasedate, `condition`, description, solddate, soldprice, idbookseries, idbookshelf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
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
      ]
    );

    res.status(201).json({ message: "Book copy created successfully" });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating copy failed, please try again!",
      500
    );
    return next(error);
  }
};
//creates new book
const createUserBook = async (req, res, next) => {

    const idbookcopy = req.body.idbookcopy;
    const bookname = req.body.bookname;
    const edition = req.body.edition;
    const publicationyear = req.body.publicationyear;
    const purchaseprice = req.body.purchaseprice;
    const purchasedate = req.body.purchasedate;
    const condition = req.body.condition;
    const description = req.body.description;
    const solddate = req.body.solddate;
    const soldprice = req.body.soldprice;
    const idbookshelf = req.body.idbookshelf;

    try {
        //sends the books information to the database
        const response = db.pool.query("INSERT INTO bookcopy (`bookname`, `edition`, `publicationyear`, `purchaseprice`, `purchasedate`, `condition`, `description`, `solddate`, `soldprice`, `idbookshelf`) VALUES ('" + bookname + "','" + edition + "','" + publicationyear + "','" + purchaseprice + "','" + purchasedate + "','" + condition + "','" + description + "','" + solddate + "','" + soldprice + "','" + idbookshelf + "')");
        res.send(response);

        console.log("This was sent");
        console.log(bookname, edition, publicationyear, purchaseprice, purchasedate, condition, description, solddate, soldprice, idbookshelf);
    }
    catch (err) {
        throw err;
    }

}

const updateBookCopy = (req, res) => {
    const idbookcopy = req.params.id;
    const { bookname, edition, publicationyear, purchaseprice, purchasedate, condition, description, solddate, soldprice } = req.body;

    const query = 'UPDATE bookcopy SET bookname=?, `edition`=?, publicationyear=?, purchaseprice=?, purchasedate=?, condition=?, description=?, solddate=?, soldprice=? WHERE idbookcopy=?';
    const values = [bookname, edition, publicationyear, purchaseprice, purchasedate, condition, description, solddate, soldprice];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to update book copy.' });
        }

        return res.status(200).json({ message: 'Book copy updated successfully.' });
    });
};

exports.updateBookCopy = updateBookCopy;
exports.getAllBookCopies = getAllBookCopies;
exports.getBookCopiesByShelfID = getBookCopiesByShelfID;
exports.createUserBook = createUserBook;
exports.createBookCopy = createBookCopy;
