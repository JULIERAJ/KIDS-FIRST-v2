const messageService = require('../service/message-service');

const createMessage = async (req, res) => {
  //req info and pass it to create new message

  try {
    const newMessage = await messageService.newMessage({
      // pass it this req here
    });
    return res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
};
