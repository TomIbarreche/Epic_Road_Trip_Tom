const express =  require('express');
const router = express.Router();
const routeStepController = require('../controllers/route_step');
const Validator = require('../middleware/validate-request-schema');
const Schema = require('../schema/route_step-schema');
const protect = require('../middleware/authMiddleware');

router.get(
  '/:user_id/:route_id',
  routeStepController.getRouteSteps
);

router.get(
  '/:user_id/:route_id/:step_id',
  routeStepController.getRouteStep
);

router.post(
  '/:user_id/:route_id',
  routeStepController.createRouteStep
);

router.put(
  '/:user_id/:route_id/:step_id',
  routeStepController.updateRouteStep
);

router.delete(
  '/:user_id/:route_id/:step_id',
  routeStepController.deleteRouteStep
);

router.delete(
  '/:user_id/:route_id',
  routeStepController.deleteRouteSteps
);
module.exports=router;
