const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env.local" });

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

//function that sends verification email with the link
const sendActivationEmail = async (to, link) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Account activation on" + process.env.API_URL,
        text: "",
        html: `
                <div>
                    <h1>Click the link below to activate your account</h1>
                    <a href='${link}'>${link}</a>
                </div>
                `,
    });
};

module.exports = { transporter, sendActivationEmail };
