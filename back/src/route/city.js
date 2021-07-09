const express =  require('express');
const router = express.Router();
const cityController = require('../controllers/city');


router.get(
    '/:name',
    cityController.getCityInfoByName
);

router.post(
    '/',
    cityController.postCityInformations
)

module.exports=router;