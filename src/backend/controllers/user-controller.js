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
        res.send(response);


        console.log("This was sent");
        console.log(username, password, email);
    }
    catch (err) {
        throw err;
    }
}
const createBookShelf = async (req, res, next) => {
    const iduser = req.body.iduser;
    const username = req.body.username;

    try {
        const result = await db.pool.query("select * from bookshelf");
        const bookshelf = result.find(b => {
            return b.iduser == iduser;
        });

        if (!bookshelf) {
            
            try {
                const newBookShelf = await db.pool.query("INSERT INTO bookshelf (idbookshelf, iduser, owner) VALUES ("+iduser+","+iduser+",'"+username+"')");
                res.send(newBookShelf);
            }
            catch (err) {
                return next(new HttpError("Creating bookshelf failed", 500));
            }
        }
        else res.send(bookshelf);
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

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "groupb1231@outlook.com",
      pass: "KissaKoira58",
    },
  });
  
  const sendEmail = async (recipientEmail) => {
    try {
      await transporter.sendMail({
        from: "groupb1231@outlook.com",
        to: recipientEmail,
        subject: "Reset ypur password",
        html: `<p>Dear user,</p><p>Please click <a href="http://localhost:3000/#/changePassword/${token}">here</a> to reset your password.</p><p>If you didn't request a password reset, please ignore this email.</p>`,
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
  
  const changePassword = async (req, res) => {
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
      return next(new HttpError("Something went wrong"));
    }
  }


exports.getAllUsers = getAllUsers;
exports.getUserByNameAndPassword = getUserByNameAndPassword;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.createBookShelf = createBookShelf;
exports.email = email;
exports.changePassword = changePassword;