const express =  require('express');
const router = express.Router();
const routeDataController = require('../controllers/route_data');
const Validator = require('../middleware/validate-request-schema');
const Schema = require('../schema/route_data-schema');
const protect = require('../middleware/authMiddleware');

router.get(
  '/:user_id/:route_id/:data_key',
  routeDataController.getRouteData
);

router.get(
  '/:user_id/:route_id',
  routeDataController.getRouteAllData
);

router.post(
  '/:user_id/:route_id',
  routeDataController.createRouteData
);

router.put(
  '/:user_id/:route_id',
  routeDataController.updateRouteData
);

router.delete(
  '/:user_id/:route_id/:data_key',
  routeDataController.deleteRouteData
);

router.delete(
  '/:user_id/:route_id',
  routeDataController.deleteRouteAllData
);
module.exports=router;
