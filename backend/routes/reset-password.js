const express = require('express');

const principleController = require('../controllers/principle-controller');

const router = express.Router();

router.get('/reset-password/:email/:resetPasswordToken', principleController.resetPasswordActivation);
router.post('/reset-password/:email/:resetPasswordToken', principleController.resetPasswordUpdates);

module.exports = router;
