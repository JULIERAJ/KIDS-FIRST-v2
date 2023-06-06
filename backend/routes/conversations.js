const express = require('express');

const conversationController = require('../controllers/conversation-controller');

const router = express.Router();

router.post('/conversations', conversationController.newConversation);

router.get(
  '/conversations/:userId',
  conversationController.getAllConversationForParticularUser
);

module.exports = router;
