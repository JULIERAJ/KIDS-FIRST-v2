const express = require("express");
const Member = require("../models/Member");
const memberController = require("../controllers/member-controller");
const router = express.Router();

router.post("/member", memberController.memberRegistration);

module.exports = router;
