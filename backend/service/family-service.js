const Family = require("../models/Family");

const familyRegistration = async (familyName, principleId) => {
    // if cannot find the same email in the system then create the new user
    const checkDuplicate = await Family.findOne({
        familyName,
        principle: principleId,
    }).exec();
    if (checkDuplicate) {
        console.log("backend duplicate ");
        throw new Error(`user with ${familyName} family name already exists`);
    } else {
        // 1) if there is such familyname, but no that person name , check if that person is invitated, if so add
        // 2) if there is no such family name, then create a new family with that principle
        const family = new Family({ familyName, principle: principleId });
        await family.save();
        console.log("family is", family);
        return { principleId, familyId: family._id };
    }
};

module.exports = { familyRegistration };
