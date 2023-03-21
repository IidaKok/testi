const HttpError = require("../models/http-error");
const db = require("../db");

//creates new user
const createUser = async (req, res, next) => {

    const iduser = req.body.iduser;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {
        //checks if the username is taken
        const users = await db.pool.query("select * from user where username = '"+username+"'");
        const user = users.find(u => {
            return u.username === username;
        });

        //if username is taken returns error
        if (user) { 
            console.log("Username is already taken");
            return next(new HttpError("Username is already taken", 404));
        }

        //sends the user's information to the database
        const response = db.pool.query("INSERT INTO user (iduser, username, password, email) VALUES ("+ iduser+",'"+username+"','"+password+"','"+email+"')");
        res.send(response);


        console.log("This was sent");
        console.log(iduser, username, password, email);
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
const getUserByName = async (req, res, next) => {
    try {
        const usernam = req.params.username;
        const password = req.params.password;
        const result = await db.pool.query("select * from user");

        //checks if the user exists
        const user = result.find(u => {
            return u.username === usernam && u.password === password;
        });

        //if user doesn't exists, error is returned
        if (!user) {
            return next(new HttpError("Can't find user", 404));
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

exports.getAllUsers = getAllUsers;
exports.getUserByName = getUserByName;
exports.createUser = createUser;
