const nodemailer = require('nodemailer');

require('dotenv').config({ path: './.env.local' });

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
const sendActivationEmail = async (email, emailVerificationToken) => {
  const href = `${process.env.CLIENT_URL}/activate/${email}/${emailVerificationToken}`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your KidsFirst verification link',
      text: '',
      html: `
              <div>
                  <h1>Welcome to the KidsFirst community</h1>
                  <p>To approve your account, please verify your email now:</p>
                <a href='${href}'>click here</a>
              </div>
      `,
    });
  } catch (e) {
    return e;
  }
};

module.exports = { sendActivationEmail };
