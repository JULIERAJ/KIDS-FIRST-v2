const express = require("express");
const Principle = require("../models/Principle");
const principleController = require("../controllers/principle-controller");

const router = express.Router();

router.post("/register", principleController.registration);
router.get("/activate/:link", principleController.activate);
module.exports = router;
