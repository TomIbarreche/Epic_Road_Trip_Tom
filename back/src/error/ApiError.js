class ApiError {
    constructor(code, message){
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static routeNotFound(msg) {
        return new ApiError(404, msg);
    }

    static internalServerError(msg) {
        return new ApiError(500, msg);
    }

    static wrongLogin(msg) {
        return new ApiError(401, msg);
    }

    static dataAlreadyExist(msg){
        return new ApiError(403, msg);
    }
}

module.exports = ApiError;