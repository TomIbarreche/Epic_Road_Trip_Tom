const db = require('../db/db');
const ApiError = require('../error/ApiError');

class RouteDataDao{

    async createRouteData(user_id, route_id, data_key, value){
        const exist = await this.routeDataExists(user_id, route_id, data_key);
        if(exist.count == '1'){
          return false;
        }else{
          return db("routes_data").insert({"user_id":user_id, "route_id":route_id, "data_key":data_key, "data_value":value});
        }

    }

    async getRouteData(user_id, route_id, data_key){
        return await db.select().from("routes_data").where('user_id', user_id).andWhere('route_id', route_id).andWhere('data_key', data_key).first();
    }

    async getRouteAllData(user_id, route_id){
        return await db.select().from("routes_data").where('user_id', user_id).andWhere('route_id', route_id);
    }

    async updateRouteData(user_id, route_id, data_key, data_value){
        return await db('routes_data').where('user_id', user_id).andWhere('route_id', route_id).andWhere('data_key', data_key).update({'data_value':data_value});
    }

    async deleteRouteData(user_id, route_id, data_key){
      return await db('routes_data').where('user_id', user_id).andWhere('route_id', route_id).andWhere('data_key', data_key).delete();
    }

    async deleteRouteAllData(user_id, route_id){
      return await db('routes_data').where('user_id', user_id).andWhere('route_id', route_id).delete();
    }

    async routeDataExists(user_id, route_id, data_key){
      return await db.count('data_key').from("routes_data").where('user_id', user_id).andWhere('route_id', route_id).andWhere('data_key', data_key).first();
    }
}

module.exports = new RouteDataDao();
