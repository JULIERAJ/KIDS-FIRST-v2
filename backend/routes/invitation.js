const express = require('express');

const invitationController = require('../controllers/invitation-controller');

const router = express.Router();

router.post('/invitation', invitationController.invitation);
// router.get('/invitiation/:email/:emailverificationToken', invitationController.invitation);
// router.post('/invitations', invitationController.invitation);

// module.exports = router;
