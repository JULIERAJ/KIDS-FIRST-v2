const Family = require("../models/Family");
const familyService = require("../service/family-service");

const familyRegistration = async (req, res) => {
    console.log("========", req.body);
    const { familyName } = req.body;
    const principleId = req.body.principleId;
    console.log(familyName, principleId);
    console.log("welcome to the backend of the family");

    try {
        const isFamilyDuplicate = await familyService.isDuplicate(
            familyName,
            principleId
        );

        if (!isFamilyDuplicate) {
            const familyData = await familyService.familyRegistration(
                familyName,
                principleId
            );
            return res.status(201).json(familyData);
        } else {
            return res.status(409).json({
                message: `the family with ${familyName} name already exists`,
                //have to think what message to give to a user. Family name already exists under this Principle?  
            });
        }
    } catch (e) {
        res.status(500).json({
            message: `something went wrong`,
        });
    }
};

module.exports = { familyRegistration };
