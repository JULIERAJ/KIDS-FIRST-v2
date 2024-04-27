const express = require('express');

const principleController = require('../controllers/principle-controller');

const router = express.Router();

router.post('/forgot-password', principleController.requestResetPassword);

module.exports = router;
