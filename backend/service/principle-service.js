const Principle = require("../models/Principle");

const registration = async (email, password) => {
    // if cannot find the same email in the system then create the new user
    const checkDuplicate = await Principle.findOne({ email }).exec();
    if (checkDuplicate) {
        console.log("backend duplicate ");
        // res.status(401).send({ message: "This user already exist" });
        throw new Error(`user with ${email} email already exists`);
    } else {
        const p1 = new Principle({ email, password });
        await p1.save();
        console.log("email:", email);

        console.log("p1 is", p1);
        return { id: p1._id, email: p1.email };
    }
};

const login = async (email, password) => {
    const user = Principle.findOne({ email, password }).exec();
    if (!user) {
        throw new Error("user not found");
    }
    return user;
};
module.exports = { registration, login };
