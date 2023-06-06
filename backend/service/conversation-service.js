const ConversationUser = require('../models/ConversationUser');

const newConversation = async (userIds) => {
  // eslint-disable-next-line no-console
  console.log(userIds); //included senderId and receiverId
  try {
    const newConversation = new ConversationUser({
      userId: userIds,
    });
    return await newConversation.save();
  } catch (err) {
    throw new Error(err);
  }
};

const getConversation = async (userId) => {
  try {
    const conversation = await ConversationUser.find({
      userIds: { $in: userId }
    });
    // eslint-disable-next-line no-console
    console.log('I M HERE', conversation);
    return conversation;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { newConversation, getConversation };
