const express = require("express");
const Principle = require("../models/Principle");
const router = express.Router();


router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log ("welcome to the backend of the register");

  //if cannot find the same email in the system then create the new user
  const checkDuplicate = await Principle.findOne({ email }).exec();
  if (checkDuplicate) {
    console.log("backend duplicate ");
    res.status(401).send({ message: "This user already exist" });
  } else {
    const principle = new Principle(req.body)
    try {
      await principle.save()
      res.status(201).send(principle)
    } catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  }}
);

module.exports = router;
