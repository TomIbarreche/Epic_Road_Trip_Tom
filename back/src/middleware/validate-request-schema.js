const { body, validationResult}  = require('express-validator');
const ApiError = require('../error/ApiError');

class Validator{
    checkRules(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let errorMsg = "";
            for (let i=0; i < errors.errors.length; i++){
                   if (i != errors.errors.length - 1){
                    errorMsg += errors.errors[i].msg + " and ";
                   }else {
                    errorMsg += errors.errors[i].msg;
                   }
            }
            next(ApiError.badRequest(errorMsg));
            return;
        }
        next();
    }
}



module.exports = new Validator();