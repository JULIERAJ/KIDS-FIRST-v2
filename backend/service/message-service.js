const Message = require('../models/Message');

const newMessage = async (conversationId, messageSender, message) => {
  try {
    const newConversation = new Message({
      conversationId,
      sender: messageSender,
      message,
    });
    return await newConversation.save();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { newMessage };
