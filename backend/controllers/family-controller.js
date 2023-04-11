const familyService = require('../service/family-service');

const familyRegistration = async (req, res) => {
  const { familyName, principleId } = req.body;

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
        // have to think what message to give to a user. 
        // Family name already exists under this Principle?  
      });
    }
  } catch (e) {
    console.log('family controller' ,e.message);
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { familyRegistration };
