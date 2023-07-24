const conversationService = require('../service/conversation-service');

const newConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    //check if the conversation is already exist or create a new one
    const conversationResult =
      await conversationService.createOrGetConversation([senderId, receiverId]);
    //if the conversation exists, return a response indicating that
    if (conversationResult.exists) {
      return res.status(302).json({
        message: 'Conversation exists',
      });
    } else {
      const savedConversation = conversationResult.conversation;
      return res.status(201).json({
        message: 'Conversation created',
        conversation: savedConversation,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getAllConversationForParticularUser = async (req, res) => {
  const { userId } = req.params;
  // eslint-disable-next-line no-console
  console.log(userId);
  try {
    const conversation = await conversationService.getConversationsByUserId(
      userId
    );
    return res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  newConversation,
  getAllConversationForParticularUser,
};
