const { body}  = require('express-validator');

const signUpValidation = [
    body('email').exists({checkFalsy: true}).isEmail().withMessage('valid email adress required'),
    body('password').exists({checkFalsy: true}).withMessage('password should exist'),
    body('user_name').exists({checkFalsy: true}).withMessage('username is required')
]

const signInValidation = [
    body('password').exists({checkFalsy: true}).withMessage('password is required')
]
module.exports = { signUpValidation: signUpValidation, signInValidation: signInValidation};