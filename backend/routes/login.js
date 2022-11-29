const express = require("express");

const Principle = require("../models/Principle");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // res.send({ message: "received in the backend " });
console.log(res)
  // find that user in the database
  const foundUser = await Principle.findOne({ email, password }).exec();

  if (foundUser) {

    // send the user information to the front end including names , family info .. etc 
    console.log("foundit");
    
  } else {
    // send error message to the front end 
    console.log("check the username and password");
   
  
};
})

module.exports = router;
