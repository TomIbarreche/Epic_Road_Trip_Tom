const ApiError = require('../error/ApiError');
const { json } = require('express');
const routeDAO = require('../dao/route');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

class RouteController {

    async getAllRoutes(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const routes = await routeDAO.getAllRoutes(user_id);
            console.log(routes);
            if(routes.length == 0){
              res.status(404).json("No routes found for user "+user_id);
            }else{
              res.status(200).json(routes);
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async getRoute(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const route = await routeDAO.getRoute(user_id, route_id);
            if(route == undefined){
              res.status(404).json("Route ("+route_id+") not found for user ("+user_id+").");
            }else{
              res.status(200).json(route);
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async createRoute(req, res, next){
        try {
            const user_id =  req.params.user_id;
            console.log(user_id);
            if (req.body.from_coords == null || !req.body.from_coords || req.body.to_coords == null || !req.body.to_coords){
                let coords =  await getCoords(req.body.from_label, req.body.to_label, req.body.from_countryCode, req.body.to_countryCode);

                req.body.from_coords =coords.departureCoords;
                req.body.to_coords =coords.destinationCoords;
            }
            console.log("USSSSSE",user_id);
            const route = await routeDAO.createRoute(user_id, req.body);
            console.log(route);
            res.status(201).json(route);
        } catch (error) {
            console.log("BIG",error)
            next(error);
        }
    }


    async updateRoute(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;

            const route = await routeDAO.updateRoute(user_id, route_id, req.body);
            if(route.length > 0){
              res.status(201).json("The route has been updated.");
            }else{
              res.status(404).json("The route ("+user_id+","+route_id+") doesn't exists.");
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async deleteAllRoutes(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route = await routeDAO.deleteRoutes(user_id);
            if(route > 0){
              res.status(202).json("All the routes for user "+user_id+" has been deleted.");
            }else{
              res.status(404).json("The routes couldn't be deleted");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }


    async deleteRoute(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const route = await routeDAO.deleteRoute(user_id, route_id);
            if(route > 0){
              res.status(202).json("The route "+route_id+" for user "+user_id+" has been deleted.");
            }else{
              res.status(404).json("The route couldn't be deleted");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

async function getCoords(departureCityName, destinationCityName, departureCountryCode, destinationCountryCode) {
    try{
        if(departureCountryCode == null){
            departureCountryCode = "fr"
        }
        if(destinationCountryCode == null){
            destinationCountryCode = "fr"
        }

        let coords = {};
        let url =  `https://api.opencagedata.com/geocode/v1/json?q=${departureCityName}}&key=cb006b97895344359f8a19b340137375&pretty=1&countrycode=${departureCountryCode}`;
        let options = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            }
          };

          await fetch(url, options)
          .then((response) =>
              response.json()
          )
          .then(function(data) {
            if(data.results.length == 0){
                throw ApiError.badRequest(departureCityName +  '/' + departureCountryCode + ' seems to not be a correct city name')
            }
            coords.departureCoords = data.results[0].geometry;
        })

        url =  `https://api.opencagedata.com/geocode/v1/json?q=${destinationCityName}}&key=cb006b97895344359f8a19b340137375&pretty=1&countrycode=${destinationCountryCode}`;
        options = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            }
          };

          await fetch(url, options)
          .then((response) =>
              response.json()
          )
          .then(function(data) {
            if(data.results.length == 0){
                throw ApiError.badRequest(departureCityName +  '/' + departureCountryCode + ' seems to not be a correct city name')
            }
            coords.destinationCoords = data.results[0].geometry;
        })
        return coords;
    }catch(err){
        console.log(err);
        throw err
    }
}
module.exports = new RouteController();
