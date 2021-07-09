const ApiError = require('../error/ApiError');
const cityDAO = require('../dao/city');

class CityController {
    async getCityInfoByName(req, res, next){
        try {
            const city_name = req.params.name;
            const cityInfo = await cityDAO.getCityInfoByName(city_name);
            
            res.status(201).json(cityInfo);
        } catch (error) {
            console.log(error)
        }
    }

    async postCityInformations(req,res, next){
        try {
            const city_name = req.body.name;
            const city_informations = req.body.city_informations;
            city_informations = JSON.stringify(city_informations);
            const postedCity = await cityDAO.postCityInformations(city_informations);
            res.status(201).json(postedCity);
        } catch (error) {
            console.log(error);
        }
    }
}

    

module.exports = new CityController();