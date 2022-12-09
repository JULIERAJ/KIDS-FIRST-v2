const Member = require("../models/Member");
const memberService = require("../service/member-service");

const memberRegistration = async (req, res) => {
    console.log("========member: ", req.body);
    const { firstname, lastname, principleId, familyId } = req.body;

    console.log("welcome to the backend of the member");
    try {
        const isMemberDuplicate = await memberService.isDuplicate(
            firstname,
            lastname,
            principleId,
            familyId
        );
        if (!isMemberDuplicate) {
            const memberData = await memberService.memberRegistration(
                firstname,
                lastname,
                principleId,
                familyId
            );
            return res.status(201).json(memberData);
        } else {
            return res.status(409).json({
                message: `the member ${firstname} ${lastname} already exists`,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: `something went wrong`,
        });
    }
};

module.exports = { memberRegistration };
