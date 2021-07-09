const express =  require('express');
const router = express.Router();
const routeController = require('../controllers/route');
const Validator = require('../middleware/validate-request-schema');
const Schema = require('../schema/route-schema');
const protect = require('../middleware/authMiddleware');

router.get(
    '/:user_id',
    routeController.getAllRoutes
);

router.get(
    '/:user_id/:route_id',
    routeController.getRoute
);

router.post(
    '/:user_id',
    routeController.createRoute
);

router.put(
    '/:user_id/:route_id',
    routeController.updateRoute
);

router.delete(
    '/:user_id',
    routeController.deleteAllRoutes
);

router.delete(
    '/:user_id/:route_id',
    routeController.deleteRoute
);

module.exports=router;
