const db =require('../db/db');
class CityDAO {

    async getCityInfoByName(city_name) {
        const city = await db('city_informations').select().where('city_name', city_name);
        console.log(city);
    }

    async postCityInformations(city_informations){
        const postedCity = await db('city_informations')
    }
}

module.exports = new CityDAO();