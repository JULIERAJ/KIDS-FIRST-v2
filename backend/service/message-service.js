const Message = require('../models/Message');

const newMessage = async (messageData) => {
  const { conversationId, sender, message } = messageData;

  try {
    const newMessage = new Message({
      conversationId,
      sender,
      message,
    });
    return await newMessage.save();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { newMessage };
