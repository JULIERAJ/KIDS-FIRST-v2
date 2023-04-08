const express = require('express');

const memberController = require('../controllers/member-controller');
const upload = require('../utils/uploader');
const router = express.Router();

router.post('/member', memberController.memberRegistration);


router.get('/member/:mid', memberController.getMemberById);

router.post('/member/upload/:mid', upload.single('avatar'), memberController.memberUploadImage);

router.put('/member/update/:mid', upload.single('avatar'), memberController.memberUpdateImage);

module.exports = router;
