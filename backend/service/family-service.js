const Family = require('../models/Family');

const familyRegistration = async (familyName, principleId) => {
  // if cannot find the same email in the system then create the new user
  
  // 1) if there is such familyname, but no that person name , 
  // check if that person is invitated, if so add
  // 2) if there is no such family name, then create a
  // new family with that principle
  const family = new Family({ familyName, principle: principleId });

  await family.save();
  
  return {
    familyName: family.familyName,
    principleId,
    familyId: family._id,
  };
};

const isDuplicate = async (familyName, principleId) => {
  const checkDuplicate = await Family.findOne({
    familyName,
    principle: principleId,
  });

  return checkDuplicate ? true : false;
};

module.exports = { familyRegistration, isDuplicate };
