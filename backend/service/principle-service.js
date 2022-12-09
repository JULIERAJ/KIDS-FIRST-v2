const Principle = require("../models/Principle");

const isDuplicate = async (email) => {
    const checkDuplicate = await Principle.findOne({ email });

    return checkDuplicate ? true : false;
};

const registration = async (email, password) => {
    // if cannot find the same email in the system then create the new user
    const p1 = new Principle({ email, password });
    await p1.save();
    console.log("email:", email);

    console.log("p1 is", p1);
    return { id: p1._id, email: p1.email };
};

const findUser = async (email) => {
    const user = await Principle.findOne({ email }).exec();
    return user ? user : null;
};

//need to add logic when campare stored password with the password provided. Depends on what crypting module is used. For ex bcrypt
const isPasswordCorrect = async (email, password) => {
    const passwordCorrect = await Principle.findOne({ email, password });

    return passwordCorrect ? true : false;
};

module.exports = { isDuplicate, registration, findUser, isPasswordCorrect };
