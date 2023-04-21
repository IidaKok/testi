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
    const {
        bookname,
        edition,
        publicationyear,
        purchaseprice,
        purchasedate,
        condition,
        description,
        solddate,
        soldprice,
        idbookshelf,
    } = req.body;

    const values = [
        bookname || null,
        edition || null,
        publicationyear || null,
        purchaseprice || null,
        purchasedate || null,
        condition || null,
        description || null,
        solddate || null,
        soldprice || null,
        idbookshelf || null,
    ];

    const insertSql = `
    INSERT INTO bookcopy 
      (bookname, edition, publicationyear, purchaseprice, purchasedate, \`condition\`, description, solddate, soldprice, idbookshelf)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING idbookcopy;
  `;

    const selectSql = `
    SELECT *
    FROM bookcopy
    WHERE idbookcopy = LAST_INSERT_ID()
  `;

    try {
        const insertResponse = await db.pool.query(insertSql, values);
        const [bookcopy] = await db.pool.query(selectSql);
        res.json({ message: "Bookcopy added to database", bookcopy });
        console.log("Bookcopy added to database");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteBookcopy = async (req, res, next) => {
    const idbookcopy = req.params.idbookcopy;
    try {
        // deletes the bookcopy with the given id from the database
        const response = await db.pool.query("DELETE FROM bookcopy WHERE idbookcopy = " + idbookcopy);
        if (response.affectedRows == 0) {
            res.status(404).json({ message: "Bookcopy not found" });
        } else {
            res.json({ message: "Bookcopy with idbookcopy = " + idbookcopy + " was deleted from the database" });
            console.log("Bookcopy with idbookcopy = " + idbookcopy + " was deleted from the database");
        }
    }
    catch (err) {
        throw err;
    }
}

const updateBookcopy = async (req, res, next) => {
    const idbookcopy = req.params.idbookcopy;
    const {
        bookname,
        edition,
        publicationyear,
        purchaseprice,
        purchasedate,
        condition,
        description,
        solddate,
        soldprice,
    } = req.body;
    const values = [bookname || null, edition || null, publicationyear || null, purchaseprice || null, purchasedate || null, condition || null, description || null, solddate || null, soldprice || null, idbookcopy,];
    const sql = `
    UPDATE bookcopy 
    SET 
      bookname = IFNULL(?, bookname), 
      edition = IFNULL(?, edition), 
      publicationyear = IFNULL(?, publicationyear), 
      purchaseprice = IFNULL(?, purchaseprice), 
      purchasedate = IFNULL(?, purchasedate), 
      \`condition\` = IFNULL(?, \`condition\`), 
      description = IFNULL(?, description), 
      solddate = IFNULL(?, solddate), 
      soldprice = IFNULL(?, soldprice) 
    WHERE idbookcopy = ?
  `;
    try {
        const response = await db.pool.query(sql, values);
        if (response.affectedRows == 0) {
            res.status(404).json({ message: "Bookcopy not found" });
        } else {
            res.json({
                message: `Bookcopy with idbookcopy = ${idbookcopy} was updated in the database`,
            });
            console.log(`Bookcopy with idbookcopy = ${idbookcopy} was updated in the database`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateBookcopy = updateBookcopy;
exports.deleteBookcopy = deleteBookcopy;
exports.getAllBookCopies = getAllBookCopies;
exports.getBookCopiesByShelfID = getBookCopiesByShelfID;
exports.createUserBook = createUserBook;
exports.createBookCopy = createBookCopy;
