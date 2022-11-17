const express = require("express");

const Family = require("../models/Family");

const router = express.Router();

/**
  
EXAMPLES:
    router.get("/family", ...)
    router.put("/family", ...)
    router.delete("/family", ...)
 */

router.post("/family", async (req, res) => {
  console.log("========", req.body);
  const {familyName} = req.body;
  const principleId = req.body.principleId; 
  console.log(familyName, principleId); 
  console.log ("welcome to the backend of the family");

  // if cannot find the same email in the system then create the new user
  const checkDuplicate = await Family.findOne({ familyName, principle: principleId}).exec();
  if (checkDuplicate) {
    console.log("backend duplicate ");
    res.status(401).send({ message: "This user already exist" });
  } else {
    // 1) if there is such familyname, but no that person name , check if that person is invitated, if so add 
    // 2) if there is no such family name, then create a new family with that principle 
    const f1 = new Family({ familyName, principle: principleId });
    await f1.save();
    console.log("f1 is", f1);
    res.send({principleId: principleId, familyId: f1._id});
  }
});

module.exports = router;
