const express = require('express');

const principleController = require('../controllers/principle-controller');
const router = express.Router();

router.get(
  '/resetPassword/:email/:resetPasswordToken',
  principleController.resetPasswordActivation,
);

router.post(
  '/resetPassword/:email/:resetPasswordToken',
  principleController.resetPasswordUpdates,
);
module.exports = router;
