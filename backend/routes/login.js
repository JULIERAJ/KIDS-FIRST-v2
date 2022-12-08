const express = require("express");
const Principle = require("../models/Principle");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log ("welcome to the login page");
  try {
    const principle = await Principle.findOne({email})
    if(!principle){
      return res.status(404).send({error:'User not found'})
    }
    const isMatch = await bcrypt.compare(password,principle.password )
    if(!isMatch){
      return res.status(401).send({error:'You have entered an invalid username or password'})
    }

    res.status(200).send(principle)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
});

module.exports = router;
