const db =require('../db/db');
const ApiError = require('../error/ApiError');
class PreferenceDao {
    
    async getAllPreferencesByUserId(user_id){
        let userPreferences = await db.column("pref_key","pref_value").select().from('users_preferences').where('user_id', user_id);
        return userPreferences;
    }

    async getPreferencesByNameForUser(user_id, key){
        let pref_value = await db.column("pref_key", "pref_value").select().from('users_preferences').where('user_id', user_id).where('pref_key', key);
        return pref_value[0];
    }

    async postPreferencesForUser(key, value, user_id){
        let pref = await db('users_preferences').insert({
            user_id: user_id,
            pref_key: key,
            pref_value: value
        }).returning(['pref_key', 'pref_value']);
        return pref[0];
    }

    async deletePreferencesByNameforUser(key, user_id){
        let pref = await db('users_preferences').where("user_id", user_id).where("pref_key", key).del(['user_id']);
        return pref[0];
    }

    async updatePreferencesByNameForUser(key, value, user_id){
        let updatedPref = await db('users_preferences').where('user_id', user_id).where("pref_key", key).update({
            pref_value: value
        }, ['pref_key', 'pref_value']);
        return updatedPref[0];
    }
}

module.exports = new PreferenceDao();