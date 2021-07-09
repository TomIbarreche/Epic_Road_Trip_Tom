const db = require('../db/db');
const ApiError = require('../error/ApiError');

class RouteStepDao{

    async createRouteStep(user_id, route_id, data){
        data.user_id = user_id;
        data.route_id = route_id;
        return await db("routes_steps").insert(data).returning(['user_id', 'route_id', 'id']);
    }

    async getRouteStep(user_id, route_id, step_id, data){
        return await db.select().from("routes_steps").where('id', step_id).andWhere('user_id', user_id).andWhere('route_id', route_id).first();
    }

    async getRouteSteps(user_id, route_id, data){
        return await db.select().from("routes_steps").where('user_id', user_id).andWhere('route_id', route_id);
    }

    async updateRouteStep(user_id, route_id, step_id, data){
        return await db('routes_steps').where('user_id', user_id).andWhere('route_id', route_id).andWhere('id', step_id).update(data, ['coords', 'data']);
    }

    async deleteRouteSteps(user_id, route_id){
      return await db('routes_steps').where('user_id', user_id).andWhere('route_id', route_id).delete();
    }

    async deleteRouteStep(user_id, route_id, step_id){
      return await db('routes_steps').where('user_id', user_id).andWhere('route_id', route_id).andWhere('id', step_id).delete();
    }
}

module.exports = new RouteStepDao();
