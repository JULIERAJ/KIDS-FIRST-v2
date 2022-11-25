const Member = require("../models/Member");
const memberService = require("../service/member-service");

const memberRegistration = async (req, res) => {
    try {
        console.log("========member: ", req.body);
        const { firstname, lastname, principleId, familyId } = req.body;
        console.log(familyId, principleId, firstname, lastname);
        console.log("welcome to the backend of the member");

        const memberData = await memberService.memberRegistration(
            firstname,
            lastname,
            principleId,
            familyId
        );
        return res.json(memberData);
    } catch (e) {
        console.log(e);
    }
};

module.exports = { memberRegistration };
