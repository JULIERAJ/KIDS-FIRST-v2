const express = require("express");
const Principle = require("../models/Principle");
const principleController = require("../controllers/principle-controller");
const router = express.Router();

router.post("/login", principleController.login);

module.exports = router;
