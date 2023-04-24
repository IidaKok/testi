const HttpError = require("../models/http-error");
const db = require("../db");

const getAllUserSeries = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from userseries");
        res.send(result);
    } catch (err) {
        throw err;
    }
};

const getUserSeriesByIdUser = async (req, res, next) => {
    try {
        const iduser = req.params.iduser;
        const result = await db.pool.query("select * from userseries where iduser = ?", [iduser]);

        if (!result) { //handling error 
            return next(new HttpError("Can't find userseries", 404));
        }
        res.json(result);
    }
    catch (err) {
        throw err;
    }
};

const createUserSeries = async (req, res, next) => {
    const {
        idbookseries,
        idbookshelf,
    } = req.body;

    try {
        await db.pool.query(
            "INSERT INTO userseries (idbookseries, idbookshelf) VALUES (?, ?)",
            [
                idbookseries,
                idbookshelf,
            ]
        );

        res.status(201).json({ message: "Userseries created successfully" });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Creating userseries failed, please try again!",
            500
        );
        return next(error);
    }
};

exports.getAllUserSeries = getAllUserSeries;
exports.getUserSeriesByIdUser = getUserSeriesByIdUser;
exports.createUserSeries = createUserSeries;