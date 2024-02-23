const express = require('express');

const principleController = require('../controllers/principle-controller');
const router = express.Router();

router.post('/loginFacebook', principleController.loginFacebook);

module.exports = router;
