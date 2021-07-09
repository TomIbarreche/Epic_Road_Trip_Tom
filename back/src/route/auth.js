const express =  require('express');
const router = express.Router();
const Validator = require('../middleware/validate-request-schema');
const Schema = require('../schema/user-schema');
const authController = require('../controllers/auth');


router.post(
    '/signUp',
    Schema.signUpValidation,
    Validator.checkRules,
    authController.signUp
);

router.post(
    '/signIn',
    Schema.signInValidation,
    Validator.checkRules,
    authController.signIn
)

module.exports=router;