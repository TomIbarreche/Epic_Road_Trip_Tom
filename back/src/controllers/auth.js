const ApiError = require('../error/ApiError');
const { json } = require('express');
const authDAO = require('../dao/auth');
const userDAO = require('../dao/user');

const bcrypt = require('bcryptjs');

class AuthController {
    async signUp(req, res, next) {
        try {
            const {user_name, email, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = await authDAO.signUp(user_name, email, hashPassword);
            req.session.user = newUser;
            res.status(201).json(newUser);
        } catch(err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async signIn(req, res, next) {
        try {
            const password = req.body.password;
            let user;
            if (req.body.email){
                const {email} = req.body;
                user = await userDAO.getUserByEmail(email);
                if (!user){
                    next(ApiError.routeNotFound("Email incorrect"));
                    return
                }
            }else if (req.body.user_name){
                const {user_name} = req.body;
                user = await userDAO.getUserByUserName(user_name);
                if (!user){
                    next(ApiError.routeNotFound("UserName incorrect"));
                    return
                }
            }
            const isCorrect = await bcrypt.compare(password, user.password);
            if(!isCorrect){
                next(ApiError.wrongLogin("Password incorrect"));
            }else{
                delete user.password;
                req.session.user = user;
                res.status(201).json(user);
            }
            
        } catch (error) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
}

module.exports = new AuthController();