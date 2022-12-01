const Member = require("../models/Member");

const memberRegistration = async (
    firstname,
    lastname,
    principleId,
    familyId
) => {
    const m1 = new Member({
        family: familyId,
        principle: principleId,
        firstname: firstname,
        lastname: lastname,
    });
    await m1.save();
    console.log("m1 is", m1);
    return { m1 };
};
const isDuplicate = async (firstname, lastname, principleId, familyId) => {
    const checkDuplicate = await Member.findOne({
        firstname,
        lastname,
        principle: principleId,
        family: familyId,
    });

    return checkDuplicate ? true : false;
};

module.exports = { memberRegistration, isDuplicate };
