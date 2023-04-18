const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const seriesRoutes = require("./routes/series-routes");
const bookRoutes = require("./routes/book-routes");
const bookshelfRoutes = require("./routes/bookshelf-routes");
const bookcopyRoutes = require("./routes/bookcopy-routes");
const photoRoutes = require("./routes/photo-routes");

const session = require("express-session");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./db");
const HttpError = require("./models/http-error");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
/*
//allows cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
*/

const cors = require('cors');

// Allow CORS for all routes
app.use(cors({
  origin: true,
  credentials: true,
}));


//login session
app.use(session({
  secret: 'groupb secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}))

const jwt = require("jsonwebtoken");
const config = {
  secret: "groupb secret"
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if(!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
   jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};


app.get('/', function (req, res) {
  //res.json({ loggedIn: false });
  if (req.session.log) {
    res.json({ iduser: req.session.userId, username: req.session.user, email: req.session.email, loggedIn: req.session.log, accessToken: req.session.token});
  }
  else {
    res.json({ loggedIn: false });
  }
})


app.post('/login',  async function (req, res, next) {
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
      res.status(404).send({ message: "Username is incorrect. Try again", accessToken: null });
      //return next(new HttpError("Username is incorrect. Try again", 404));
    }

    //checks is the password correct
    const result = await db.pool.query("select * from user");
    const user = result.find(u => {
      return u.username === username && u.password === password;
    });

    if (!user) {
      res.status(401).send({ message: "Password is incorrect. Try again", accessToken: null });
      //return next(new HttpError("Password is incorrect. Try again", 404));
    }

   /* if (req.body.username == user.username && req.body.password == user.password) {
      let token = jwt.sign({ id: user.iduser }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        iduser: user.iduser,
        username: user.username,
        email: user.email,
        accessToken: token
      });
      req.session.user = user.username;
      req.session.email = user.email;
      req.session.userId = user.iduser;
      req.session.log = true;
      req.session.token = token;
      console.log("token: " + token);
    }*/


    //if username and password are correct, session is created
    if (req.body.username == user.username && req.body.password == user.password) {
      req.session.regenerate(function (err) {
        if (err) next(err)

        let token = jwt.sign({ id: user.iduser }, config.secret, {
          expiresIn: 86400 // 24 hours
        });


        req.session.user = user.username;
        req.session.email = user.email;
        req.session.userId = user.iduser;
        req.session.log = true;
        req.session.token = token;

        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/')
        })
      })
    }
  }
  catch (err) {
    throw err;
  }
}
)

app.post('/logout', function (req, res, next) {
  req.session.log = false;
  req.session.user = null;
  req.session.email = null;
  req.session.userId = null;


  req.session.save(function (err) {
    if (err) next(err)

    req.session.regenerate(function (err) {
      if (err) next(err)
      req.session.destroy()
      res.clearCookie("connect.sid")
      res.redirect('/')
    })

  })
})

app.use("/api/users", userRoutes);
app.use("/api/bookseries", seriesRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/bookshelf", bookshelfRoutes);
app.use("/api/bookcopy", bookcopyRoutes);
app.use("/api/photo", photoRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error" });
})

app.listen(5000);