const express = require('express');

const principleController = require('../controllers/principle-controller');
const router = express.Router();

router.post('/loginSocial', principleController.loginSocial);

module.exports = router;
