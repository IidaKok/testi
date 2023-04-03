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
        await db.pool.query(
          "INSERT INTO bookseries (bookseries, publisher, description, classification) VALUES (?, ?, ?, ?)",
          [
            bookseries,
            publisher,
            description,
            classification,
          ]
        );
    
        res.status(201).json({ message: "Bookseries created successfully" });
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Creating bookseries failed, please try again!",
          500
        );
        return next(error);
      }
}
exports.getAllSeries = getAllSeries;
exports.getSeriesByName = getSeriesByName;
exports.createSeries = createSeries;