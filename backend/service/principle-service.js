const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env.local" });
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

//need to add logic when compare stored password with the password provided. Depends on what crypting module is used. For ex bcrypt
const isPasswordCorrect = async (email, password) => {
    const passwordCorrect = await Principle.findOne({ email });
    const isMatch = await bcrypt.compare(password, passwordCorrect.password);
    return isMatch ? true : false;
};

const emailTokenVerification = async (activationToken) => {
    const tokenVerified = jwt.verify(
        activationToken,
        process.env.JWT_EMAIL_VERIFICATION_SECRET
    );

    return tokenVerified ? true : false;
};
const activateAccount = async (email) => {
    const user = await Principle.findOneAndUpdate(
        { email: email },
        { emailIsActivated: true },
        { new: true }
    );
    console.log("user", user);
    return user;
};
module.exports = {
    isDuplicate,
    registration,
    findUser,
    isPasswordCorrect,
    emailTokenVerification,
    activateAccount,
};
