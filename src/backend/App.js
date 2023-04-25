const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const seriesRoutes = require("./routes/series-routes");
const bookRoutes = require("./routes/book-routes");
const bookshelfRoutes = require("./routes/bookshelf-routes");
const bookcopyRoutes = require("./routes/bookcopy-routes");
const photoRoutes = require("./routes/photo-routes");
const pictureRoutes = require("./routes/picture-routes");
const artworkRoutes = require("./routes/artwork-routes");
const userseriesRoutes = require("./routes/userseries-routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./db");

// Allow CORS
const cors = require('cors');
app.use(cors({
  origin: true,
  credentials: true
}));


//app uses routes
app.use("/api/users", userRoutes);
app.use("/api/bookseries", seriesRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/bookshelf", bookshelfRoutes);
app.use("/api/bookcopy", bookcopyRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/picture", pictureRoutes);
app.use("/api/artwork", artworkRoutes);
app.use("/api/userseries", userseriesRoutes);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error" });
})

app.listen(5000);