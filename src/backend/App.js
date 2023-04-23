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
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Content-Type", "application/json");
  next();
});*/



const jwt = require("jsonwebtoken");
const config = { secret: "groupb secret" };
let myToken;

//after user is logged in, users data is returned
app.get("/", async (req, res) => {
  console.log("myToken: " + myToken);

  if (!myToken) {
    return res.status(401).json({ message: 'Missing or invalid authorization token', loggedIn: false });
  }
  else {
    //decodes token and gets user id
    const decoded = jwt.verify(myToken, config.secret);
    const userId = decoded.id;
    console.log("decoded: " + decoded.id);

    try {
      const result = await db.pool.query("select * from user where iduser = " + userId);
      //if no users are found, error is returned
      if (!result) {
        return next(new HttpError("Can't find users", 404));
      }

      res.json({ message: 'Success!', user: result, loggedIn: true });
    }
    catch (err) {
      return next(new HttpError("Something went wrong"));
    }
  }

})

//when user logs in, token is created
app.post('/login', async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    //checks username
    const result1 = await db.pool.query("select * from user where username = '" + username + "'");
    const userByName = result1.find(u => {
      return u.username === username;
    });

    //if username doesn't exists, error is returned
    if (!userByName) {
      return res.status(404).send({ message: "Username is incorrect. Try again", loggedIn: false });
    }

    //checks is the password correct
    const result = await db.pool.query("select * from user");
    const user = result.find(u => {
      return u.username === username && u.password === password;
    });

    if (!user) {
      return res.status(401).send({ message: "Password is incorrect. Try again", loggedIn: false });
    }

    //if everything is correct, token is created
    let token = jwt.sign({ id: user.iduser }, config.secret, { expiresIn: "24h", });

    myToken = token;
    res.json({ token: myToken });
  }
  catch (err) {
    throw err;
  }
})

//when user logs out, token is set to null
app.post('/logout', function (req, res, next) {
  myToken = null;
  res.json({ message: "logged out" });
})

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