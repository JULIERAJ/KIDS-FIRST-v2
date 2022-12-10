const express = require("express");
const principleController = require("../controllers/principle-controller");
const router = express.Router();

router.post("/register", principleController.registration);

module.exports = router;
