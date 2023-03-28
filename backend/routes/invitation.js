const express = require('express');

const invitationController = require('../controllers/invitation-controller');
const router = express.Router();

router.post('/invitations', invitationController.invitation);

module.exports = router;
