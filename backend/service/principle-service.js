const bcrypt = require('bcryptjs');
const Principle = require("../models/Principle");

const registration = async (email, password) => {
    const principle = new Principle({ email, password });
    await principle.save();

    return { id: principle._id, email: principle.email };
};

const findUser = async (email) => {
    const user = await Principle.findOne({ email }).exec();
    return user ? user : null;
};

//need to add logic when compare stored password with the password provided. Depends on what crypting module is used. For ex bcrypt
const isPasswordCorrect = async (email, password) => {
    const passwordCorrect = await Principle.findOne({ email });
    const isMatch = await bcrypt.compare(password,passwordCorrect.password )
    return isMatch ? true : false;
};

module.exports = { registration, findUser, isPasswordCorrect };
