const express = require('express');

const messageController = require('../controllers/message-controller');
const router = express.Router();

router.post('/messages', messageController.createMessage);
router.get('/messages/:conversationId', messageController.getMessage);

module.exports = router;
