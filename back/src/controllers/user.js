const ApiError = require('../error/ApiError');
const { json } = require('express');
const userDAO = require('../dao/user');
const bcrypt = require('bcryptjs');

class UserController {
    async createPost(req, res, next){
        try {
            const post = await userDAO.createPost();
            res.status(201).json(post);
        } catch (error) {
            console.log(error)
        }
    }

    async getAllUsers(req, res, next){
        try{
            const users = await userDAO.getAllUsers();
            res.status(200).json(users);
        }catch(err) {
            console.log(err);
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
    async getUserById(req, res, next) {
        try{
            const userId = req.params.id
            const user = await userDAO.getUserById(userId);
            if (!user){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            res.status(200).json(user);
        }catch(err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async updateUser(req, res, next) {
        try{
            const userId = req.params.id;
            const updatedUser = await userDAO.updateUser(userId, req.body);
            res.status(201).json(updatedUser[0]);
        }catch(err) {
            if (err.code == 400){
                next(ApiError.badRequest(err.message));
            }else if(err.code == 404){
                next(ApiError.routeNotFound(err.message));
            }
            else if(err.code == 23505){
                err.constraint == 'users_user_name_unique' ? next(ApiError.dataAlreadyExist("Username already taken")) : next(ApiError.dataAlreadyExist("Email already taken"));
            }
            else
            {
                next(ApiError.internalServerError("Oups! Something went wrong"));
            }
        }
    }

    async deleteUserById(req, res, next) {
        try{
            const userId = req.params.id;
            const deletedUser = await userDAO.deleteUserById(userId);
            if (!deletedUser){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            res.status(202).json(deletedUser);
        }catch(err){
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
}

module.exports = new UserController();