const conversationService = require('../service/conversation-service');

const newConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const savedConversation = await conversationService.newConversation([
      senderId,
      receiverId,
    ]);
    return res.status(201).json(savedConversation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getAllConversationForParticularUser = async (req, res) => {
  const { userId } = req.params;
  // eslint-disable-next-line no-console
  // console.log(userId);
  try {
    const conversation = await conversationService.getConversation(userId);
    return res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  newConversation,
  getAllConversationForParticularUser,
};
