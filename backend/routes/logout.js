const express = require('express');

const principleController = require('../controllers/principle-controller');
const router = express.Router();

router.get('/logout', principleController.logout);

module.exports = router;