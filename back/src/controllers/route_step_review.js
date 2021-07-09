const ApiError = require('../error/ApiError');
const { json } = require('express');
const route_step_reviewDAO = require('../dao/route_step_review');
const bcrypt = require('bcryptjs');

class RouteStepReviewController {



    async createRouteStepReview(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const step_id =  req.params.step_id;

            const review = await route_step_reviewDAO.createRouteStepReview(user_id, route_id, step_id, req.body);
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async getRouteStepReview(req, res, next){
        try {
            const user_id = req.params.user_id;
            const route_id = req.params.route_id;
            const step_id = req.params.step_id;
            const review_id = req.params.review_id;
            const review = await route_step_reviewDAO.getRouteStepReview(user_id, route_id, step_id, review_id);
            if(review == undefined){
              res.status(404).json("Review ("+review_id+") for the step ("+step_id+") not found for user's ("+user_id+") route ("+route_id+")");
            }else{
              res.status(200).json(review);
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async getRouteStepReviews(req, res, next){
        try {
            const user_id = req.params.user_id;
            const route_id = req.params.route_id;
            const step_id = req.params.step_id;
            const reviews = await route_step_reviewDAO.getRouteStepReviews(user_id, route_id, step_id);
            if(reviews.length == 0){
              res.status(404).json("No reviews found for user's ("+user_id+") route ("+route_id+") and step ("+step_id+")");
            }else{
              res.status(200).json(reviews);
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async updateRouteStepReview(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const step_id = req.params.step_id;
            const review_id = req.params.review_id;
            const review = await route_step_reviewDAO.updateRouteStepReview(user_id, route_id, step_id, review_id, req.body);
            if(review > 0){
              res.status(201).json("The review has been updated.");
            }else{
              res.status(404).json("The review ("+user_id+","+route_id+","+step_id+","+review_id+") doesn't exists.");
            }
        } catch (error) {
            res.status(400).json(error.detail);
        }
    }


    async deleteRouteStepReview(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const step_id = req.params.step_id;
            const review_id = req.params.review_id;
            const review = await route_step_reviewDAO.deleteRouteStepReview(user_id, route_id, step_id, review_id);
            res.status(201).json("Review ("+review_id+") for the route's ("+route_id+") step "+step_id+" and user "+user_id+" has been deleted.");
        } catch (error) {
            res.status(400).json(error);
        }
    }


    async deleteRouteStepReviews(req, res, next){
        try {
            const user_id =  req.params.user_id;
            const route_id =  req.params.route_id;
            const step_id = req.params.step_id;
            const reviews = await route_step_reviewDAO.deleteRouteStepReviews(user_id, route_id, step_id);
            res.status(201).json("All the reviews for the route's ("+route_id+") step "+step_id+" and user "+user_id+" has been deleted.");
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

module.exports = new RouteStepReviewController();
