const ConversationUser = require('../models/ConversationUser');

const newConversation = async (userIds) => {
  // eslint-disable-next-line no-console
  console.log(userIds);
  try {
    const newConversation = new ConversationUser({
      userId: userIds,
    });
    return await newConversation.save();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { newConversation };
