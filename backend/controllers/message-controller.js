const messageService = require('../service/message-service');

const createMessage = async (req, res) => {
  const { conversationId, sender, message } = req.body;
  try {
    const newMessage = await messageService.newMessage(
      conversationId,
      sender,
      message
    );
    return res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessage = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await messageService.getMessage(conversationId);
    return res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getMessage,
};
