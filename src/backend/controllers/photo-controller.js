const HttpError = require("../models/http-error");
const db = require("../db");

const getAllBookCopyPhoto = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from photo");
        res.send(result);
    } catch (err) {
        throw err;
    }
};

const getAllBookCopyPhotos = async (req, res, next) => {
    try {
        const idbookcopy = req.params.idbookcopy;
        const result = await db.pool.query("select * from photo where idbookcopy = ?", [idbookcopy]);

        if (result.length === 0) { //handling error
            return next(new HttpError("Can't find photo", 404));
        }

        res.json(result);
    }
    catch (err) {
        throw err;
    }
}
//creates new photo
const createUserPhoto = async (req, res, next) => {
    const photoname = req.body.photoname ?? null;
    const idbookcopy = req.body.idbookcopy ?? null;
    const pagenumber = req.body.pagenumber ?? null;

    try {
        //sends the books information to the database
        const response = await db.pool.query("INSERT INTO photo (`photoname`, `idbookcopy`, `pagenumber`) VALUES (?, ?, ?)", [photoname, idbookcopy, pagenumber]);

        // Convert the BigInt value to a string
        response.insertId = response.insertId.toString();

        res.send(response);
        console.log("This was sent");
        console.log(photoname, idbookcopy, pagenumber);
    } catch (err) {
        throw err;
    }
}
//updates the photo
const updateBookPhoto = async (req, res, next) => {
    const idbookcopy = req.params.idbookcopy;
    const { photoname, pagenumber } = req.body;
    const values = [photoname || null, pagenumber || null, idbookcopy];
    const sql = `
    UPDATE photo 
    SET 
      photoname = IFNULL(?, photoname),
      pagenumber = IFNULL(?, pagenumber)
    WHERE idbookcopy = ?
  `;
    try {
        const response = await db.pool.query(sql, values);
        if (response.affectedRows == 0) {
            res.status(404).json({ message: "Photo not found" });
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

const deleteBookPhoto = async (req, res, next) => {
    const idbookcopy = req.params.idbookcopy;
    try {
        // deletes the bookcopy with the given id from the database
        const response = await db.pool.query("DELETE FROM photo WHERE idbookcopy = " + idbookcopy);
        if (response.affectedRows == 0) {
            res.status(404).json({ message: "Photo not found" });
        } else {
            res.json({ message: "Photo with idbookcopy = " + idbookcopy + " was deleted from the database" });
            console.log("Photo with idbookcopy = " + idbookcopy + " was deleted from the database");
        }
    }
    catch (err) {
        throw err;
    }
}


exports.updateBookPhoto = updateBookPhoto;
exports.deleteBookPhoto = deleteBookPhoto;
exports.createUserPhoto = createUserPhoto;
exports.getAllBookCopyPhoto = getAllBookCopyPhoto;
exports.getAllBookCopyPhotos = getAllBookCopyPhotos;