const ConversationUser = require('../models/ConversationUser');

const createOrGetConversation = async (userIds) => {
  // eslint-disable-next-line no-console
  console.log(userIds); //included senderId and receiverId
  try {
    const conversationResult = await ConversationUser.findOne({
      userIds: { $all: userIds },
    }).exec();
    if (conversationResult)
      return { conversation: conversationResult, exists: true };
    else {
      const newConversation = new ConversationUser({
        userIds,
      });
      const savedConversation = await newConversation.save();
      return { conversation: savedConversation, exists: false };
    }
  } catch (err) {
    throw new Error(err);
  }
};

const getConversationsByUserId = async (userId) => {
  try {
    const conversation = await ConversationUser.find({
      userIds: { $in: userId },
    }).exec();
    return conversation;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  getConversationsByUserId,
  createOrGetConversation,
};
