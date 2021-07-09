const db = require('../db/db');
const ApiError = require('../error/ApiError');

class RouteDao {

    async getAllRoutes(user_id) {
        let routes = await db.select().from("routes").where('user_id', user_id);
        return routes;
    }

    async getRoute(user_id, route_id) {
        let route = await db.select().from("routes").where('user_id', user_id).andWhere('id', route_id).first();
        return route;
    }

    async createRoute(user_id, data){
        return await db("routes").insert(
        {
          user_id: user_id,
          departure: data.departure,
          from_label: data.from_label,
          from_coords: data.from_coords,
          to_label: data.to_label,
          to_coords: data.to_coords
      }).returning(['user_id', 'id']);
    }

    async updateRoute(user_id, route_id, data){
      return await db('routes').where('user_id', user_id).andWhere('id', route_id).update(data, ['date_planned', 'departure', 'from_label', 'from_coords', 'to_label', 'to_coords']);
    }

    async deleteRoutes(user_id){
      return await db('routes').where('user_id', user_id).delete();
    }

    async deleteRoute(user_id, route_id){
      return await db('routes').where('user_id', user_id).andWhere('id', route_id).delete();
    }
}

module.exports = new RouteDao();
