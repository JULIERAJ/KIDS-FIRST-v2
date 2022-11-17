const express = require("express");

const Member = require("../models/Member");

const router = express.Router();

router.post("/member", async (req, res) => {
  console.log("========member: ", req.body);
  const  {firstname, lastname, principleId, familyId}= req.body;
  console.log(familyId, principleId, firstname, lastname); 
  console.log ("welcome to the backend of the member");

  // if cannot find the same user in the same family  then create the new member 
  const checkDuplicate = await Member.findOne({ family: familyId, principle: principleId, firstname, lastname}).exec();
  if (checkDuplicate) {
    console.log("backend duplicate ");
    res.status(401).send({ message: "This user already exist in this family" });
  } else {
    const m1 = new Member({ family: familyId, principle: principleId, firstname: firstname, lastname: lastname });
    await m1.save();
    console.log("m1 is", m1);
    res.send({m1});
  }
});

module.exports = router;
