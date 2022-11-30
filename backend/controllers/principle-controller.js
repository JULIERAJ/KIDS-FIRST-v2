const principleService = require("../service/principle-service");

const registration = async (req, res) => {
    try {
        const { email, password } = req.body;
        // res.send({ message: "received in the backend " });

        console.log("welcome to the backend of the register");

        const principleData = await principleService.registration(
            email,
            password
        );

        return res.status(201).json(principleData);
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    // res.send({ message: "received in the backend " });

    try {
        // find that user in the database
        const foundUser = await principleService.login(email, password);

        if (!foundUser) {
            return res.status(404).json({
                message: "user not found",
            });
        }
        // send the user information to the front end including names , family info .. etc

        console.log("foundit");
    } catch (e) {
        res.status(500).json({
            message: "Failed to login",
        });
    }
};
module.exports = { registration, login };
