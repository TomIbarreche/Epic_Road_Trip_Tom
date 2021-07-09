const express =  require('express');
const router = express.Router();
const preferenceController = require('../controllers/preference');

router.get(
    '/:id',
    preferenceController.getAllPreferencesByUserId
)

router.get(
    '/:id/:name',
    preferenceController.getPreferencesByNameForUser
)

router.post(
    '/',
    preferenceController.postPreferencesForUser
)

router.delete(
    '/:id',
    preferenceController.deletePreferencesByNameforUser
)

router.put(
    '/:id',
    preferenceController.updatePreferencesByNameForUser
)

module.exports=router;