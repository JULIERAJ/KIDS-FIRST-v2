require("dotenv").config({ path: "./.env.local" });
const jwt = require("jsonwebtoken");
const principleService = require("../service/principle-service");
const emailService = require("../service/email-service");

const registration = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("welcome to the backend of the register");
        const isPrincipleDuplicate = await principleService.isDuplicate(email);

        console.log("isPrincipleDuplicate:", isPrincipleDuplicate);

        if (!isPrincipleDuplicate) {
            const principleData = await principleService.registration(
                email,
                password
            );

            const emailVerificationToken = jwt.sign(
                {
                    email,
                },
                process.env.JWT_EMAIL_VERIFICATION_SECRET,
                { expiresIn: "1h" }
            );

            await emailService.sendActivationEmail(
                email,
                emailVerificationToken
            );
            return res.status(201).json({
                message: `user ${principleData.email} registered, verification link sent`,
                email: principleData.email,
                emailIsActivated: principleData.emailIsActivated,
            });
        } else {
            return res.status(409).json({
                message: `The user with ${email} email already exists`,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: `something went wrong`,
        });
    }
};

const accountActivation = async (req, res) => {
    const activationToken = req.params.emailVerificationToken;

    const email = req.params.email;

    try {
        const activationTokenVerified =
            await principleService.emailTokenVerification(activationToken);

        if (!activationTokenVerified) {
            return res
                .status(400)
                .json({ message: `activation link is not correct` });
        } else {
            const principleData = await principleService.activateAccount(email);
            console.log("principleData:", principleData);
            return res.status(200).json({
                message: `the account is successfully activated`,
                email: principleData.email,
                emailIsActivated: principleData.emailIsActivated,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: e.message,
        });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await principleService.findUser(email);

        console.log("user:", user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const correctPassword = await principleService.isPasswordCorrect(
            email,
            password
        );
        if (!correctPassword) {
            return res.status(401).json({
                error: "Password or username is not correct",
            });
        }
        return res.status(200).json({ email: user.email, id: user._id });
    } catch (e) {
        return res.status(500).json({
            message: "Failed to login",
        });
    }
};
module.exports = { registration, accountActivation, login };
