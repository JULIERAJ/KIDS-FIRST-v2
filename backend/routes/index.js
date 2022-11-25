const express = require("express");
const router = express.Router();
const principleController = require("../controllers/principle-controller");
const memberController = require("../controllers/member-controller");
const invitationController = require("../controllers/invitation-controller");
const familyController = require("../controllers/family-controller");

router.post("/register", principleController.registration);
router.get("/activate/:link", principleController.activate);
router.post("/login", principleController.login);
router.post("/member", memberController.memberRegistration);
router.post("/invitation", invitationController.invitation);
/**
EXAMPLES:
    router.get("/family", ...)
    router.put("/family", ...)
    router.delete("/family", ...)
 */
router.post("/family", familyController.familyRegistration);

module.exports = router;
