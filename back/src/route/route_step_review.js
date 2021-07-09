const express =  require('express');
const router = express.Router();
const routeStepReviewController = require('../controllers/route_step_review');
const Validator = require('../middleware/validate-request-schema');
const Schema = require('../schema/route_step-schema');
const protect = require('../middleware/authMiddleware');

router.get(
  '/:user_id/:route_id/:step_id/:review_id',
  routeStepReviewController.getRouteStepReview
);

router.get(
  '/:user_id/:route_id/:step_id',
  routeStepReviewController.getRouteStepReviews
);

router.post(
  '/:user_id/:route_id/:step_id',
  routeStepReviewController.createRouteStepReview
);

router.put(
  '/:user_id/:route_id/:step_id/:review_id',
  routeStepReviewController.updateRouteStepReview
);

router.delete(
  '/:user_id/:route_id/:step_id',
  routeStepReviewController.deleteRouteStepReviews
);

router.delete(
  '/:user_id/:route_id/:step_id/:review_id',
  routeStepReviewController.deleteRouteStepReview
);
module.exports=router;
