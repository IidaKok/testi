const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const seriesRoutes = require("./routes/series-routes");
const bookRoutes = require("./routes/book-routes");
const bookshelfRoutes = require("./routes/bookshelf-routes");
const bookcopyRoutes = require("./routes/bookcopy-routes");


const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//allows cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Content-Type", "application/json");
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/bookseries", seriesRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/bookshelf", bookshelfRoutes);
app.use("/api/bookcopy", bookcopyRoutes);
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "unknown error" });
})

app.post("/bookcopy", (req, res) => {
    const q = "INSERT INTO bookcopy (`bookname`, `edition`, `publicationyear`, `purchaseprice`, `purchasedate`, `condition`, `description`, `solddate`, `soldprice`) VALUES (?)";
    const values = [
        req.body.bookname,
        req.body.edition,
        req.body.publicationyear,
        req.body.purchaseprice,
        req.body.purchasedate,
        req.body.condition,
        req.body.description,
        req.body.solddate,
        req.body.soldprice,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully")
    });
});

app.listen(5000);