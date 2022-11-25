const Principle = require("../models/Principle");
const uuid = require("uuid");
const mailService = require("./mail-service");

const registration = async (email, password) => {
    // if cannot find the same email in the system then create the new user
    const checkDuplicate = await Principle.findOne({ email }).exec();
    if (checkDuplicate) {
        console.log("backend duplicate ");
        // res.status(401).send({ message: "This user already exist" });
    } else {
        const activationLink = uuid.v4();
        const p1 = new Principle({ email, password, activationLink });
        await p1.save();
        console.log("email:", email);
        await mailService.sendActivationEmail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );
        console.log("p1 is", p1);
        return { id: p1._id, email: p1.email, isActivated: p1.isActivated };
    }
};

const activate = async (activationLink) => {
    const principle = await Principle.findOne({ activationLink });
    console.log(principle);

    if (!principle) {
        throw new Error("the activation link is not correct");
    }

    principle.isActivated = true;

    await principle.save();
};

const login = async (email, password) => {
    try {
        const user = Principle.findOne({ email, password }).exec();
        if (user) {
            console.log("foundit");
        }
        return user;
    } catch (e) {}
};
module.exports = { registration, activate, login };
