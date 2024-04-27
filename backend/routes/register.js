const express = require('express');

const invitationController = require('../controllers/invitation-controller');
const principleController = require('../controllers/principle-controller');

const router = express.Router();

router.post('/register', principleController.registration);
router.get('/activate/:email/:emailVerificationToken', principleController.accountActivation);
router.get('/register/:email/:family/:emailVerificationToken', invitationController.invitationAccepted);
router.post('/resend-email', principleController.resendActivationEmail);

module.exports = router;
