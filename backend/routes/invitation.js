const express = require("express");

const Invitation = require("../models/Invitation");

const router = express.Router();

router.post("/invitation", async (req, res) => {
  console.log("========invitation: ", req.body);
  const  {invitor, family, inviteeEmail, invitationUrl}= req.body;
  console.log(invitor, family, inviteeEmail, invitationUrl); 
  console.log ("welcome to the backend of the invitation ");

  const i1 = new Invitation({ invitor, family, inviteeEmail, invitationUrl});
  await i1.save();
  console.log("i1 is", i1);
  res.send({i1});
});

module.exports = router;
