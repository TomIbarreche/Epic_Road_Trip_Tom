const ApiError = require('../error/ApiError');
const { json } = require('express');
const route_stepDAO = require('../dao/route_step');
const bcrypt = require('bcryptjs');

class RouteStepController {



    async createRouteStep(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;

            const step = await route_stepDAO.createRouteStep(user_id, route_id, req.body);
            res.status(201).json(step);
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async getRouteStep(req, res, next){
        try {
            const user_id = req.params.user_id;
            const route_id = req.params.route_id;
            const step_id = req.params.step_id;
            const step = await route_stepDAO.getRouteStep(user_id, route_id, step_id);
            if(step == undefined){
              res.status(404).json("Step ("+step_id+") not found for user's ("+user_id+") route ("+route_id+").");
            }else{
              res.status(200).json(step);
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async getRouteSteps(req, res, next){
        try {
            const user_id = req.params.user_id;
            const route_id = req.params.route_id;
            const steps = await route_stepDAO.getRouteSteps(user_id, route_id);
            if(steps.length == 0){
              res.status(404).json("No steps found for user's ("+user_id+") route ("+route_id+")");
            }else{
              res.status(200).json(steps);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateRouteStep(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const step_id = req.params.step_id;
            const step = await route_stepDAO.updateRouteStep(user_id, route_id, step_id, req.body);

            if(step.length > 0){
              res.status(201).json("The step has been updated.");
            }else{
              res.status(404).json("The step ("+user_id+","+route_id+","+step_id+") doesn't exists.");
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async deleteRouteStep(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const step_id = req.params.step_id;
            const step = await route_stepDAO.deleteRouteStep(user_id, route_id, step_id);

            if(step > 0){
              res.status(201).json("The step "+step_id+" for the route "+route_id+" and user "+user_id+" has been deleted.");
            }else{
              res.status(404).json("The route's step couldn't be deleted");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }


    async deleteRouteSteps(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const steps = await route_stepDAO.deleteRouteSteps(user_id, route_id);

            if(steps > 0){
              res.status(201).json("All the steps for the route "+route_id+" and user "+user_id+" has been deleted.");
            }else{
              res.status(404).json("The route's steps couldn't be deleted");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

module.exports = new RouteStepController();
