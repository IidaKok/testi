const HttpError = require("../models/http-error");
const db = require("../db");

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

exports.getAllUsers = getAllUsers;
exports.getUserByNameAndPassword = getUserByNameAndPassword;
exports.createUser = createUser;
exports.deleteUser = deleteUser;