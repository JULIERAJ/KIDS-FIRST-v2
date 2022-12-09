const principleService = require("../service/principle-service");

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

            return res.status(201).json(principleData);
        } else {
            return res.status(409).json({
                message: `the user with ${email} email already exists`,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: `something went wrong`,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await principleService.findUser(email);

        console.log("user:", user);

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        const correctPassword = await principleService.isPasswordCorrect(
            email,
            password
        );
        if (!correctPassword) {
            res.status(401).json({
                error: "password or username is not correct",
            });
        }
        return res.status(200).json({ email: user.email, id: user._id });
    } catch (e) {
        res.status(500).json({
            message: "Failed to login",
        });
    }
};
module.exports = { registration, login };
