const express = require('express');

const conversationController = require('../controllers/conversation-controller');

const router = express.Router();

router.post('/', conversationController.newConversation);

module.exports = router;
