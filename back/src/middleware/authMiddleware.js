const ApiError = require('../error/ApiError');

const protect = (req, res, next) => {
    const {user} = req.session;
    console.log("user", user);
    if (!user){
        console.log("is")
        next(ApiError.wrongLogin("Unauthorized"));
    }else{
        console.log("userddd", user);

        req.user = user;
        next();
    }
    
}

module.exports = protect;