const express = require("express");
const Family = require("../models/Family");
const familyController = require("../controllers/family-controller");
const router = express.Router();

/**
  
EXAMPLES:
    router.get("/family", ...)
    router.put("/family", ...)
    router.delete("/family", ...)
 */

router.post("/family", familyController.familyRegistration);

module.exports = router;
