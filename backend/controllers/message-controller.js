const messageService = require('../service/message-service');

const createMessage = async (req, res) => {
  try {
    const newMessage = await messageService.newMessage(req.body);
    return res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
};
