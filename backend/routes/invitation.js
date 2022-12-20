const express = require("express");
const invitationController = require("../controllers/invitation-controller");
const router = express.Router();

router.post("/invitation", invitationController.invitation);

module.exports = router;
