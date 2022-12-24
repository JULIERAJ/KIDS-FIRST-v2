const express = require('express');

const principleController = require('../controllers/principle-controller');
const router = express.Router();

router.post('/register', principleController.registration);
router.get(
  '/activate/:email/:emailVerificationToken',
  principleController.accountActivation
);

module.exports = router;
