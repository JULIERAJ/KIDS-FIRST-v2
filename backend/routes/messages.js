const express = require('express');

const messageController = require('../controllers/message-controller');
const router = express.Router();

router.post('/messages', messageController.createMessage);
// router.get('/messages/:userId', messageController, getAllMessagesForParticularUser);

module.exports = router;
