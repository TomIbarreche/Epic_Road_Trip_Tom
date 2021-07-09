const ApiError = require('../error/ApiError');
const { json } = require('express');
const route_dataDAO = require('../dao/route_data');
const bcrypt = require('bcryptjs');

class RouteDataController {




    async getRouteData(req, res, next){
        try {
            const user_id = req.params.user_id;
            const route_id = req.params.route_id;
            const data_key = req.params.data_key;
            const data = await route_dataDAO.getRouteData(user_id, route_id, data_key);
            // console.log(data);
            if(data.length == 0){
              res.status(404).json("data ("+data_key+") not found for user's ("+user_id+") route ("+route_id+")");
            }else{
              res.status(200).json(data);
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async getRouteAllData(req, res, next){
        try {
            const user_id = req.params.user_id;
            const route_id = req.params.route_id;
            const data = await route_dataDAO.getRouteAllData(user_id, route_id);
            if(data.length == 0){
              res.status(404).json("No data found for user's ("+user_id+") route ("+route_id+")");
            }else{
              res.status(200).json(data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async createRouteData(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            var object = req.body;
            Object.keys(object).forEach(data_key => {
              //a améliorer car pas de gestion d'erreur
              route_dataDAO.createRouteData(user_id, route_id, data_key, object[data_key]);
            });
            // const step = await route_dataDAO.createRouteData(user_id, route_id, req.body);
            res.status(201).json("Insertion ok");
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async updateRouteData(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const object = req.body;
            Object.keys(object).forEach(data_key => {
              route_dataDAO.updateRouteData(user_id, route_id, data_key, object[data_key]);
            });
            res.status(201).json("The data has been updated.");
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async deleteRouteData(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const data_key = req.params.data_key;
            const data = await route_dataDAO.deleteRouteData(user_id, route_id, data_key);
            if(data > 0){
              res.status(201).json("The data "+data_key+" for the route "+route_id+" and user "+user_id+" has been deleted.");
            }else{
              res.status(404).json("The routes data couldn't be deleted");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }


    async deleteRouteAllData(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const data = await route_dataDAO.deleteRouteAllData(user_id, route_id);

            if(data > 0){
              res.status(201).json("All the data for the route "+route_id+" and user "+user_id+" has been deleted.");
            }else{
              res.status(404).json("The routes data couldn't be deleted");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

module.exports = new RouteDataController();
