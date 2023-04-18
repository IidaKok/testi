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

/*
//login session
app.use(session({
  secret: 'groupb secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}))*/

const jwt = require("jsonwebtoken");
const config = {
  secret: "groupb secret"
};
/*
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
};*/


app.get('/', async function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // get the JWT token from the Authorization header
  //const user = null;
  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid authorization token', loggedIn: false });
  }

  if (token !== "null") {
    const decoded = jwt.verify(token, config.secret);
    console.log("decoded: " + decoded.id);


    res.json({ iduser: decoded.id, loggedIn: true });
  }
  else {
    res.json({ loggedIn: false });
  }

  const tokenCookie = req.headers.cookie && req.headers.cookie.split('; ')
    .find(cookie => cookie.startsWith('token='));
  if (tokenCookie) {
    const tokenValue = tokenCookie.split('=')[1];
    console.log("tokenValue: " + tokenValue);
  } else {
    // the token cookie was not found
  }

  //const [user] = await db.pool.query("SELECT * FROM user WHERE iduser=" + decoded.id);
  //console.log("user: " + user[0]);

  /*try {
    const user = await db.pool.query("SELECT * FROM user WHERE iduser=" + decoded.id);
    console.log("user: " + user);
    //res.send(result);

    //if no users are found, error is returned
    if (!result) {
      return next(new HttpError("Can't find user", 404));
    }
  }
  catch (err) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }

  /*jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    //req.userId = decoded.id;
    console.log("decoded: " + decoded.id);

    
  });
  const user = await db.pool.query("SELECT * FROM user WHERE iduser=2");
  console.log("user: " + user);
  res.json({iduser: user.iduser, username: user.username, email: user.email, loggedIn: true});*/

})
app.get('/user/:iduser', async function (req, res) {
  try {
    const result = await db.pool.query("select * from user where iduser = " + req.params.iduser);
    res.send(result);

    //if no users are found, error is returned
    if (!result) {
      return next(new HttpError("Can't find users", 404));
    }
  }
  catch (err) {
    throw err;
  }
})


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
      //return next(new HttpError("Username is incorrect. Try again", 404));
    }

    //checks is the password correct
    const result = await db.pool.query("select * from user");
    const user = result.find(u => {
      return u.username === username && u.password === password;
    });

    if (!user) {
      return res.status(401).send({ message: "Password is incorrect. Try again", loggedIn: false });
      //return next(new HttpError("Password is incorrect. Try again", 404));
    }


    let token = jwt.sign({ id: user.iduser }, config.secret, {
      expiresIn: "24h" // 24 hours
    });
    res.cookie("token", token);
    res.json({ token });
    /* res.status(200).send({
       iduser: user.iduser,
       username: user.username,
       email: user.email,
       //loggedIn: true,
       accessToken: token
     });*/
    console.log("token: " + token);


    /*
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
        }*/
  }
  catch (err) {
    throw err;
  }
})

function basicDetails(user) {
  const { iduser, username, password, email } = user;
  return { iduser, username, password, email };
}

/*
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
})*/

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