const HttpError = require("../models/http-error");
const db = require("../db");
var nodemailer = require('nodemailer');

//creates new user
const createUser = async (req, res, next) => {

    //const iduser = req.body.iduser;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    let error = [];
    let msg1 = "Username is already taken";
    let msg2 = "The email address is already subscribed. Please try to use another one or simply Log in";


    try {
        //checks if the username is taken
        const userByName = await db.pool.query("select * from user where username = '" + username + "'");
        const usern = userByName.find(u => {
            return u.username === username;
        });
        
        //checks if the email is taken
        const userByEmail = await db.pool.query("select * from user where email = '" + email + "'");
        const usere = userByEmail.find(u => {
            return u.email === email;
        });

        //if username or email is taken returns error
        if (usern || usere) {
            if (usern) {
                error.push(msg1);
            }
            if (usere) {
                error.push(msg2);
            }
            return next(new HttpError(error, 400));
        }

        //sends the user's information to the database
        const response = db.pool.query("INSERT INTO user (username, password, email) VALUES ('" + username + "','" + password + "','" + email + "')");

        setTimeout(async () => {
       try {
        const result1 = await db.pool.query("select * from user where username = '" + username + "'");
        const user = result1.find(u => {
            return u.username === username;
        });

        if (!user) {
          console.log("username: ", username);
            return next(new HttpError("Something went wrong", 404));
        }

        console.log(user.iduser);
        await db.pool.query("INSERT INTO bookshelf (idbookshelf, iduser, owner) VALUES ("+user.iduser+","+user.iduser+",'"+username+"')");
        res.send(response);
        console.log(username, password, email);
      }
        
      catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    }, 1000);
    }
    catch (err) {
        throw err;
    }
}

//gets all users from the database
const getAllUsers = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from user");
        res.send(result);

        //if no users are found, error is returned
        if (!result) {
            return next(new HttpError("Can't find users", 404));
        }
    }
    catch (err) {
        throw err;
    }
}
//gets user from the database based on username and password
const getUserByNameAndPassword = async (req, res, next) => {

    try {
        const username = req.params.username;
        const password = req.params.password;

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


        res.json(basicDetails(user));
    }
    catch (err) {
        throw err;
    }
}


function basicDetails(user) {
    const { iduser, username, password, email } = user;
    return { iduser, username, password, email };
}
const deleteUser = async (req, res, next) => {
    const username = req.params.username;
    let user;
    try {
        user = await db.pool.query("select * from user  where username = '" + username + "'");
        res.status(200);
        if (user) {
            try {
                await db.pool.query("delete from user  where username = '" + username + "'");
            }
            catch (err) {
                return next(new HttpError("Deleting user failed", 500));
            }
        }
        else {
            return next(new HttpError("Can't find user", 404));
        }
    }
    catch (err) {
        throw err;
    }

}

const jwt = require("jsonwebtoken");
const config = { secret: "groupb secret" };
var nodemailer = require('nodemailer');
let token;
let myToken;

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "bookarchive2023@outlook.com",
      pass: "KissaKoira58",
    },
  });
  
  const sendEmail = async (recipientEmail) => {
    try {
      await transporter.sendMail({
        from: "bookarchive2023@outlook.com",
        to: recipientEmail,
        subject: "Change your password",
        html: `<p>Dear user,</p><p>Please click <a href="https://iidakok.github.io/groupb-project/#/changePassword/${token}">here</a> to change your password.</p><p>If you didn't request a password change link, please ignore this email.</p>`,
        //html: `<p>Dear user,</p><p>Please click <a href="http://localhost:3000/#/changePassword/${token}">here</a> to change your password.</p><p>If you didn't request a password change link, please ignore this email.</p>`,
      });
  
      console.log("Email sent successfully");
    } catch (error) {
      console.error(error);
    }
  };
  
  const email = async (req, res) => {
    const recipientEmail = req.query.email;
    try {
      const result = await db.pool.query("select * from user");
      const user = result.find(u => {
        return u.email === recipientEmail;
      });
  
      if (!user) {
        return res.status(404).send("There is no user that uses given email" );
      }
  
      //if email is correct, token is created
      let t = jwt.sign({ id: user.iduser }, config.secret, { expiresIn: "24h", });
  
      token = t;
      sendEmail(recipientEmail);
      res.send("Email sent successfully");
  
    } catch (error) {
      console.error(error);
    }
  }
  
  const changePassword = async (req, res, next) => {
    const { tokenfromUrl } = req.params;
    const { password } = req.body;
    
    
    try {
      const decoded = jwt.verify(tokenfromUrl, config.secret);
      const userId = decoded.id;
      console.log("decoded: " + decoded.id);
  
      const result = await db.pool.query("UPDATE user SET password = '" + password + "' WHERE iduser = " + userId);
      //if no users are found, error is returned
      if (!result) {
        return next(new HttpError("Can't find user", 404));
      }
      console.log("Password reset successfully");
      res.status(200).json({ message: "Password changed" });
    }
    catch (err) {
        return next(new HttpError("Unauthorized"));
    }
  }


//login
  
//after user is logged in, users data is returned
const islogged =  async (req, res) => {
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
  }
  
  //when user logs in, token is created
  const login = async (req, res, next) => {
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
  }
  
  //when user logs out, token is set to null
    const logout = (req, res, next) => {
    myToken = null;
    res.json({ message: "logged out" });
  }

exports.getAllUsers = getAllUsers;
exports.getUserByNameAndPassword = getUserByNameAndPassword;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.email = email;
exports.changePassword = changePassword;
exports.login = login;
exports.logout = logout;
exports.islogged = islogged;