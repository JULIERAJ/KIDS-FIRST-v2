const express = require('express');

const memberController = require('../controllers/member-controller');
const router = express.Router();

router.post('/member', memberController.memberRegistration);
router.get('/member/:id', memberController.getMember);
module.exports = router;
