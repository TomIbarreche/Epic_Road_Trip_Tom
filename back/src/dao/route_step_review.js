const db = require('../db/db');
const ApiError = require('../error/ApiError');

class RouteStepReviewDao{

    async createRouteStepReview(user_id, route_id, step_id, data){
        data.user_id = user_id;
        data.route_id = route_id;
        data.step_id = step_id;
        return await db("steps_reviews").insert(data).returning(['user_id', 'route_id', 'step_id', 'id']);
    }


    async getRouteStepReview(user_id, route_id, step_id, review_id){
        return await db.select().from("steps_reviews").where('user_id', user_id).andWhere('route_id', route_id).andWhere('step_id', step_id).andWhere('id', review_id).first();
    }


    async getRouteStepReviews(user_id, route_id, step_id){
        return await db.select().from("steps_reviews").where('user_id', user_id).andWhere('route_id', route_id).andWhere('step_id', step_id);
    }


    async updateRouteStepReview(user_id, route_id, step_id, review_id, data){
        return await db('steps_reviews').where('user_id', user_id).andWhere('route_id', route_id).andWhere('step_id', step_id).andWhere('id', review_id).update(data);
    }


    async deleteRouteStepReview(user_id, route_id, step_id, review_id){
      return await db('steps_reviews').where('user_id', user_id).andWhere('route_id', route_id).andWhere('step_id', step_id).andWhere('id', review_id).delete();
    }


    async deleteRouteStepReviews(user_id, route_id, step_id){
      return await db('steps_reviews').where('user_id', user_id).andWhere('route_id', route_id).andWhere('step_id', step_id).delete();
    }
}

module.exports = new RouteStepReviewDao();
