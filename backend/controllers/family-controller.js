const Family = require("../models/Family");
const familyService = require("../service/family-service");

const familyRegistration = async (req, res) => {
    try {
        console.log("========", req.body);
        const { familyName } = req.body;
        const principleId = req.body.principleId;
        console.log(familyName, principleId);
        console.log("welcome to the backend of the family");

        const f1 = await familyService.familyRegistration(
            familyName,
            principleId
        );
        console.log("f1:", f1);
        res.status(201).send(f1);
    } catch (e) {
        console.log(e);
        res.status(409).send(e.message);
    }
};

module.exports = { familyRegistration };
