const principleService = require("../service/principle-service");

// 1 upper/lower case letter, 1 number, 1 special symbol
const passwordRegExp  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const emailRegExp = /^\S+@\S+\.\S+$/;

const registration = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await principleService.findUser(email);

        if(user) {
            res.status(409).json({ message: `The user with ${email} email already exists` });
        }

        if(!passwordRegExp.test(password)) {
            res.status(400).json({ message: "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one number" });
        } else if(!emailRegExp.test(email)) {
            res.status(400).json({ message: "Invalid email" });
        } else if(!user) {
            user = await principleService.registration(email, password);
            res.status(201).json({ id: user.id, email: user.email });
        }
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
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
module.exports = { registration, login };
