const express = require("express");

const Family = require("../models/Family");

const router = express.Router();
const familyController = require("../controllers/family-controller");
/**
  
EXAMPLES:
    router.get("/family", ...)
    router.put("/family", ...)
    router.delete("/family", ...)
 */

router.post("/family", familyController.familyRegistration);

module.exports = router;
