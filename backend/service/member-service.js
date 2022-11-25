const Member = require("../models/Member");

const memberRegistration = async (
    firstname,
    lastname,
    principleId,
    familyId
) => {
    const checkDuplicate = await Member.findOne({
        family: familyId,
        principle: principleId,
        firstname,
        lastname,
    }).exec();
    if (checkDuplicate) {
        console.log("backend duplicate ");
        res.status(401).send({
            message: "This user already exist in this family",
        });
    } else {
        const m1 = new Member({
            family: familyId,
            principle: principleId,
            firstname: firstname,
            lastname: lastname,
        });
        await m1.save();
        console.log("m1 is", m1);
        return { m1 };
    }
};

module.exports = { memberRegistration };
