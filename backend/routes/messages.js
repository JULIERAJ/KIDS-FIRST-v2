const express = require('express');

const messageController = require('../controllers/message-controller');
const router = express.Router();

router.post('/', messageController.createMessage);

module.exports = router;
