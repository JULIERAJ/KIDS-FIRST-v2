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

        return res.json(principleData);
    } catch (e) {
        console.log(e);
    }
};

const activate = async (req, res) => {
    try {
        const activationLink = req.params.link;

        console.log("activationLink", activationLink);

        await principleService.activate(activationLink);

        return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
        console.log(e);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    // res.send({ message: "received in the backend " });

    try {
        // find that user in the database
        const foundUser = await principleService.login(email, password);

        if (foundUser) {
            // send the user information to the front end including names , family info .. etc
            console.log("foundit");
        } else {
            // send error message to the front end
            console.log("check the username and password again");
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
    } catch (e) {
        console.log(e);
    }
};
module.exports = { registration, activate, login };
