const HttpError = require("../models/http-error");
const db = require("../db");

const getAllSeries = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from bookseries");
        res.send(result);
    } catch (err) {
        throw err;
    }
}
const getSeriesById = async (req, res, next) => {
    try {
        const idbookseries = req.params.idbookseries;
        const result = await db.pool.query("select * from bookseries where idbookseries = ?", [idbookseries]);

        if (result.length === 0) { //handling error
            return next(new HttpError("Can't find bookseries", 404));
        }

        res.json(result);
    }
    catch (err) {
        throw err;
    }
}
const getSeriesByName = async (req, res, next) => {
    try {
        const seriesname = parseInt(req.params.bookseries);
        const result = await db.pool.query("select * from bookseries");

        const series = result.find(s => {
            return s.bookseries === seriesname;
        });
        
        if (!series) { //handling error 
            return next(new HttpError("Can't find book series", 404));
        }
        res.json({ series });
    }
    catch (err){
        throw err;
    }
}

//creates new series
const createSeries = async (req, res, next) => {
    const {
        bookseries,
        publisher,
        description,
        classification,
    } = req.body;

    try {
        const result = await db.pool.query(
            "INSERT INTO bookseries (`bookseries`, publisher, description, classification) VALUES (?, ?, ?, ?)",
            [
                bookseries,
                publisher,
                description,
                classification,
            ]
        );
    
        const newId = parseInt(result.insertId); // get the newly created idbookseries
    
        res.status(201).json({ message: "Bookseries created successfully", id: newId });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Creating bookseries failed, please try again!",
            500
        );
        return next(error);
    }
}

const updateSeries = async (req, res, next) => {
    const { idbookseries } = req.params;
    const { bookseries, publisher, description, classification } = req.body;

    try {
        const result = await db.pool.query(
            "UPDATE bookseries SET `bookseries`=?, publisher=?, description=?, classification=? WHERE idbookseries=?",
            [bookseries, publisher, description, classification, idbookseries]
        );

        if (result.affectedRows === 0) {
            const error = new HttpError(
                "Could not find a bookseries with the given id.",
                404
            );
            return next(error);
        }

        res.status(200).json({ message: "Bookseries updated successfully" });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Updating bookseries failed, please try again!",
            500
        );
        return next(error);
    }
};

const deleteSeries = async (req, res, next) => {
    const idbookseries = req.params.idbookseries;
    try {
        const response = await db.pool.query("DELETE FROM bookseries WHERE idbookseries = " + idbookseries);
        if (response.affectedRows == 0) {
            res.status(404).json({ message: "Bookseries not found" });
        } else {
            res.json({ message: "Bookseries with idbookseries = " + idbookseries + " was deleted from the database" });
            console.log("Bookseries with idbookseries = " + idbookseries + " was deleted from the database");
        }
    }
    catch (err) {
        throw err;
    }
};
  
exports.getAllSeries = getAllSeries;
exports.getSeriesById = getSeriesById;
exports.getSeriesByName = getSeriesByName;
exports.createSeries = createSeries;
exports.updateSeries = updateSeries;
exports.deleteSeries = deleteSeries;