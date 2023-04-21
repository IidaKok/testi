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

app.set('trust proxy', 1);


const cors = require('cors');
// Allow CORS for all routes
app.use(cors({
  // origin: "http://localhost:3000", //this is the frontend url
   //origin: "https://bookarchive-test.azurewebsites.net",
   origin: true,
   credentials: true,
  // sameSite: "none"
 }));
/*
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://bookarchive-test.azurewebsites.net");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Private-Network", true);
  next();
});*/





app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
   // domain: "http://192.168.8.101:3000",
    //domain: 'bookarchive-test.azurewebsites.net', // set the domain of the cookie to your frontend domain
    maxAge: 60000, // set the maxAge to 7 days
    //sameSite: "none",
    httpOnly: true
  }
}));
/*
const jwt = require("jsonwebtoken");
const config = {
  secret: "groupb secret"
};

app.get('/', async function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // get the JWT token from the Authorization header

  //const user = null;
  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid authorization token', loggedIn: false });
  }
  else {
    const decoded = jwt.verify(token, config.secret);
    console.log("decoded: " + decoded.id);
    return res.json({ iduser: decoded.id, loggedIn: true, token: token });
  }
  /* if (token !== "null") {
     const decoded = jwt.verify(token, config.secret);
     console.log("decoded: " + decoded.id);
     res.json({ iduser: decoded.id, loggedIn: true });
   }
   else {
     res.json({ loggedIn: false });
   }*/
  /*const cookieSessionId = req.cookies['token'];
  if (!cookieSessionId) {
    return res.status(401).json({ message: 'Missing or invalid authorization token', loggedIn: false });
  }
  else {
    const decoded = jwt.verify(cookieSessionId, config.secret);
    console.log("decoded: " + decoded.id);
    res.json({ iduser: decoded.id, loggedIn: true });
  }*/

//});

app.get('/', authenticateToken, async (req, res) => {
  const userId = req.userId;
  
  if (req.session.token) {
    // user is logged in
    const result = await db.pool.query("select * from user where iduser = " + userId);
    //if no users are found, error is returned
    if (!result) {
      return next(new HttpError("Can't find users", 404));
    }

    res.json({ message: 'Success!', result: result });
  } else {
    // user is not logged in
    res.status(401).json({ message: 'no token' });
  }
});



const jwt = require("jsonwebtoken");
const config = {
  secret: "groupb secret"
};



// Set up middleware to authenticate the user with a token
function authenticateToken(req, res, next) {
  console.log("req.session.token: " + req.session.token);
  const token = req.cookies['token'];
  
  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid authorization token', loggedIn: false });
  }
  else {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    console.log("decoded: " + decoded.id);
    return res.json({ iduser: decoded.id, loggedIn: true, token: token });
  }
}


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

    req.session.regenerate(function (err) {
      if (err) next(err)

      req.session.user = user.username;
      req.session.email = user.email;
      req.session.log = true;


      let token = jwt.sign({ id: user.iduser }, config.secret, {expiresIn: "24h",});
      res.cookie("token", token, /*{
        httpOnly: true, 
        maxAge: 60000,
        sameSite: "none"
      }*/);


      req.session.token = token;

      console.log("token in /login: " + req.session.token);

      req.session.save(function (err) {
        if (err) return next(err)
        //res.redirect('/')
        res.json({token: token});
      })
    })

    /*
        let token = jwt.sign({ id: user.iduser }, config.secret, {
          expiresIn: "24h", // 24 hours
        });
        res.cookie("token", token, {
          httpOnly: true, 
          maxAge: 60000,
          //domain: "bookarchive-test.azurewebsites.net",
          //sameSite: 'lax'
        });
        res.json({ token });
        console.log("token: " + token);*/
  }
  catch (err) {
    throw err;
  }
})
app.post('/logout', function (req, res, next) {
  //res.clearCookie("token");
  

  
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.clearCookie('token'); // clear the session cookie
    res.json({ message: 'Logout successful' });
  });
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