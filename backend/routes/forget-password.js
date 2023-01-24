const express = require('express');

const principleController = require('../controllers/principle-controller');
const router = express.Router();

router.post('/forgetPassword', principleController.requestResetPassword);

module.exports = router;
  