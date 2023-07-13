const Message = require('../models/Message');

const newMessage = async (conversationId, sender, message) => {
  try {
    const newMessageObj = new Message({ conversationId, sender, message });
    return await newMessageObj.save();
  } catch (err) {
    throw new Error(err);
  }
};

const getMessage = async (conversationId) => {
  // eslint-disable-next-line no-console
  // console.log(messageData);
  // const { conversationId } = messageData;
  try {
    const messages = await Message.find({ conversationId });
    return messages;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { newMessage, getMessage };
