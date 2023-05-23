const conversationService = require('../service/conversation-service');

const newConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const newConversation = await conversationService.newConversation([
      senderId,
      receiverId,
    ]);
    return res.status(201).json(newConversation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  newConversation,
};
