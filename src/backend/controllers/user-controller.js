const HttpError = require("../models/http-error");
const db = require("../db");

/*
const TESTUSERS = [
    {
        "iduser": 1,
        "username": "Maikki",
        "password": "Kissa",
        "email": "MaikkiOnKissa@hotmail.com"
    },
    {
        "iduser": 2,
        "username": "Mikko",
        "password": "Kissa",
        "email": "MikkoOnKissa@hotmail.com"
    }
];
const getTesti = (req, res, next) => {
    res.json( {TESTUSERS} );
}
const postTesti = async (req, res, next) => {
    const User = [];
    const createUser = new User({
        iduser: req.params.iduser,
        username: req.params.username,
        password: req.params.password,
        email: req.params.email
    });
    try {
        await createUser.save();
    }
    catch (err) {
        const error = HttpError("Failed to create new user", 500);
        return next(error);
    }
    res.status(201).json(createUser);
}
*/


const createUser = async (req, res, next) => {

    const iduser = req.body.iduser;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {
        const users = await db.pool.query("select * from user where username = '"+username+"'");
        const user = users.find(u => {
            return u.username === username;
        });

        if (user) { //handling error
            console.log("Username is already taken");
            return next(new HttpError("Username is already taken", 404));
        }
        const response = db.pool.query("INSERT INTO user (iduser, username, password, email) VALUES ("+ iduser+",'"+username+"','"+password+"','"+email+"')");
        res.send(response);
        console.log("Tämä lähetettiin");
        console.log(iduser, username, password, email);
    }
    catch (err) {
        throw err;
    }

}
/*
const findByUsername = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from user");
        res.send(result);
        if (!result) { //handling error
            return next(new HttpError("Can't find user by username", 404));
        }
    }
    catch (err) {
        throw err;
    }
}*/
const getAllUsers = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from user");
        res.send(result);
        if (!result) { //handling error
            return next(new HttpError("Can't find users", 404));
        }
    }
    catch (err) {
        throw err;
    }
}
/*
const createUser = async (req, res, next) => {
    //let task = req.body;
    try {
        const response = {
            iduser: req.params.iduser,
            username: req.params.username,
            password: req.params.password,
            email: req.params.email
        };
        console.log(response);
        res.end(JSON.stringify(response));
 
        if (!response) { //handling error
            return next(new HttpError("Can't find user", 404));
        }
 
    } catch (err) {
        throw err;
    }
}/*
 const User = [];
    const createUser = new User({
        iduser: req.params.iduser,
        username: req.params.username,
        password: req.params.password,
        email: req.params.email
    });
    try {
        await createUser.save();
    }
    catch (err) {
        const error = HttpError("Failed to create new user", 500);
        return next(error);
    }
    res.status(201).json(createUser);
 
}*/
const getUserByName = async (req, res, next) => {
    try {
        const usernam = req.params.username;
        const password = req.params.password;
        const result = await db.pool.query("select * from user");

        const user = result.find(u => {
            return u.username === usernam && u.password === password;
        });

        if (!user) { //handling error
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
