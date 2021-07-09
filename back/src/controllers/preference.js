const ApiError = require('../error/ApiError');
const preferenceDAO = require('../dao/preference');
const userDAO = require('../dao/user');


class PreferenceController {
    async getAllPreferencesByUserId(req, res, next) {
        try {
            const user_id = req.params.id;
            if (await userDAO.getUserById(user_id) == null){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            
            let user = await preferenceDAO.getAllPreferencesByUserId(user_id);
            let user_preferences = {};
            user_preferences.user_preferences = [];
            user.forEach(data => {
                let pref = {};
                pref[data.pref_key] = data.pref_value;
                user_preferences.user_preferences.push(pref);
            });
            user_preferences.user_id = parseInt(user_id);
            res.status(201).json(user_preferences);
        } catch(err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
    
    async getPreferencesByNameForUser(req,res,next){
        try {
            const user_id = req.params.id;
            if (await userDAO.getUserById(user_id) == null){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            const pref_key = req.params.name;
            const pref_value = await preferenceDAO.getPreferencesByNameForUser(user_id, pref_key);
            if (pref_value == null){
                next(ApiError.badRequest("This preference doesn't exists"));
                return
            }
            let prefToreturn = {};
            prefToreturn.user_id = parseInt(user_id);
            prefToreturn.user_preferences = [];
            let pref = {};
            pref[pref_value.pref_key] = pref_value.pref_value;
            prefToreturn.user_preferences.push(pref);
            res.status(201).json(prefToreturn);
        } catch (error) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async postPreferencesForUser(req,res,next){
        try {
            const user_id = req.body.user_id;
            if (await userDAO.getUserById(user_id) == null){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            let userUpdated = {};
            userUpdated.user_id = parseInt(user_id);
            userUpdated.new_user_preferences = [];

            for(let pref in req.body.new_user_preferences){
                if(await preferenceDAO.getPreferencesByNameForUser(user_id, pref) == null){
                    let prefs = {}; 
                    let prefRaw = await preferenceDAO.postPreferencesForUser(pref, req.body.new_user_preferences[pref], user_id);
                    prefs[prefRaw.pref_key] = prefRaw.pref_value;
                    userUpdated.new_user_preferences.push(prefs);
                }
            }
            res.status(201).json(userUpdated);
        } catch (error) {
            console.log(error)
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async deletePreferencesByNameforUser(req,res,next){
        try {
            const user_id = req.params.id;
            if (await userDAO.getUserById(user_id) == null){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            let prefToDelete = req.body.user_preferences;
            for(let pref in prefToDelete){
                if(await preferenceDAO.getPreferencesByNameForUser(user_id, prefToDelete[pref]) != null){
                    await preferenceDAO.deletePreferencesByNameforUser(prefToDelete[pref], user_id);
                }
            }
            res.status(201).json({user_id: parseInt(user_id)});
        } catch (error) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async updatePreferencesByNameForUser(req,res,next){
        try {
            const user_id = req.params.id;
            if (await userDAO.getUserById(user_id) == null){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            let userUpdated = {};
            userUpdated.user_id = parseInt(user_id);
            userUpdated.updated_user_preferences = [];
            for(let pref in req.body.user_preferences){
                 let updatedprefs = await preferenceDAO.updatePreferencesByNameForUser(pref, req.body.user_preferences[pref], user_id);
                 let prefs = {}; 
                    prefs[updatedprefs.pref_key] = updatedprefs.pref_value;
                    userUpdated.updated_user_preferences.push(prefs);
            }
            res.status(201).json(userUpdated);
        } catch (error) {
            console.log(error);
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
}

module.exports = new PreferenceController();