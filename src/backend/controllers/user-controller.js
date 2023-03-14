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
const getUserById = async (req, res, next) => {
    

    const userid = parseInt(req.params.iduser);
    const user = TESTUSERS.find(u => {
        return u.iduser === userid;
    });
    if (!user) { //handling error
        return next(new HttpError("Can't find user", 404));
    }
    res.json({ user });
}*/



const getAllUsers = async (req, res, next) => {
    try {
        const result = await db.pool.query("select * from user");
        res.send(result);
    } catch (err) {
        throw err;
    }
}
/*
const createUser = async (req, res, next) => {
        let task = req.body;
        try {
            const result = await db.pool.query("insert into user (description) values (?)", [task.description]);
            res.send(result);
        } catch (err) {
            throw err;
        }
    }
    const { username, password, email } = req.body;
    const createUser = new User({
        username,
        password,
        email
    });
    try {
        await createUser.save();
    }
    catch (err) {
        const error = HttpError("Failed to create new user", 500);
        return next(error);
    }
    res.status(201).json(createUser);*/


const getUserByName = async (req, res, next) => {
    try {
        const usernam = req.params.username;
        const result = await db.pool.query("select * from user");

        const user = result.find(u => {
            return u.username === usernam;
        });
        
        if (!user) { //handling error
            return next(new HttpError("Can't find username", 404));
        }
        res.json({ user });
    }
    catch (err){
        throw err;
    }
}

exports.getAllUsers = getAllUsers;
exports.getUserByName = getUserByName;