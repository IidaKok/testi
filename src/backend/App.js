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
var escapeHtml = require('escape-html');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
/*
//allows cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});*/


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
/*
// middleware to test if authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) next()
  else next('route')
}

app.get('/', isAuthenticated, (req, res) => {
  //console.log(`Welcome, ${req.session.id}`);
  const cookieSessionId = req.cookies['connect.sid'];

  if (cookieSessionId.includes(req.session.id)) {
    res.json({ username: req.session.user, email: req.session.email, sessionId: req.session.id, loggedIn: req.session.log });
  }
  else {
    cookieSessionId = null;
    res.json({ loggedIn: false });
  }
  //res.send(req.session.id);
});
app.get('/', function (req, res) {
  console.log('Log in');
  res.json("Not logged");
})*/

app.get('/', function (req, res) {
  if (req.session.log) {
    res.json({ username: req.session.user, email: req.session.email, sessionId: req.session.id, loggedIn: req.session.log });

    /*const cookieSessionId = req.cookies['connect.sid'];

    if (cookieSessionId.includes(req.session.id)) {
      res.json({ username: req.session.user, sessionId: req.session.id, loggedIn: req.session.log });
    }
    else {
      cookieSessionId = null;
      res.json({ loggedIn: false });
    }*/
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
      return next(new HttpError("Username is incorrect. Try again", 404));
    }

    //checks is the password correct
    const result = await db.pool.query("select * from user");
    const user = result.find(u => {
      return u.username === username && u.password === password;
    });

    if (!user) {
      return next(new HttpError("Password is incorrect. Try again", 404));
    }


    //if username and password are correct, user is logged in
    if (req.body.username == user.username && req.body.password == user.password) {
      req.session.regenerate(function (err) {
        if (err) next(err)

        req.session.user = req.body.username;
        req.session.email = req.body.email;
        req.session.log = true;

        req.session.save(function (err) {
          if (err) return next(err)
          //res.json({username: user.username, password: user.password, email: user.email, loggedIn: true})
          res.redirect('/')
        })
      })
    }
    else {
      console.log('Invalid username or password');
      res.send('Invalid username or password');
    }
  }
  catch (err) {
    throw err;
  }
}
)
app.post('/logout', function (req, res, next) {
  req.session.user = null;
  req.session.email = null;
  req.session.log = false;
  req.session.save(function (err) {
    if (err) next(err)

    req.session.destroy(function (err) {
      if (err) next(err)
      res.redirect('/')
      //res.json({ loggedIn: false });
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