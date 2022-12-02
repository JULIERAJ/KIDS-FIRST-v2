const express = require("express");

const Principle = require("../models/Principle");

const router = express.Router();

const emailRegExp = /^\S+@\S+\.\S+$/;
// TODO: + SYMPBOLS ??
// TODO: check min/max ??
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  let user = await Principle.findOne({ email });

  if (user) {
    res.status(409).json({ message: "This user already exist" });
  }
  
  if(!passwordRegExp.test(password)) {
    res.status(400).json({ message: "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one number" });
  } else if(!emailRegExp.test(email)) {
    res.status(400).json({ message: "Invalid email" });
  } else {
    user = new Principle({ email, password });
    await user.save();
    res.status(201).json({ id: user._id, email: user.email });
  }

});

module.exports = router;
