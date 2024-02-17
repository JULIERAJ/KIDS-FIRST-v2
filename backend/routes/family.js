const express = require('express');

const familyController = require('../controllers/family-controller');

const router = express.Router();

router.post('/family', familyController.familyRegistration);

module.exports = router;
