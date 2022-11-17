const express = require("express");

const Principle = require("../models/Principle");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  // res.send({ message: "received in the backend " });
  console.log ("welcome to the backend of the register");

  // if cannot find the same email in the system then create the new user
  const checkDuplicate = await Principle.findOne({ email }).exec();
  if (checkDuplicate) {
    console.log("backend duplicate ");
    res.status(401).send({ message: "This user already exist" });
  } else {
    const p1 = new Principle({ email, password });
    await p1.save();
    console.log("p1 is", p1);
    res.send({id: p1._id, email: p1.email});
  }
});

module.exports = router;
