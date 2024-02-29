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
      subject: 'KIDS FIRST Account Verification',
      text: '',
      html: `
              <div style="text-align: center;">
                  <img src="cid:logo"
                   alt="Logo" style="width: 62px;" />
                <br>
                  <p style="margin-bottom: 25px">Hello and welcome to KIDS FIRST!</p>
                  <p>To continue the registration process, please click Verify My Account.</p>
                  <br>
                  <div style="margin-top: 20px;">
                    <a href="${href}" style="padding: 10px 38px; 
                    background-color: #5BA056; color: black; text-decoration: none; 
                    border-radius: 5px; font-weight: 400;">Verify My Account</a>

                    <hr style="border-top: 1px solid lightgray; width: 350px;
                     margin-top: 25px;">
                  </div>
                  <p style="color: #938B8B;">
                  Do not reply to this automated email.</p>
                </div>
      `,
      attachments: [
        {
          filename: 'kids_first_logo_beta.png',
          path: '../frontend/src/media/logo/kids_first_logo_beta.png',
          cid: 'logo',
        },
      ],
    });
  } catch (e) {
    return e;
  }
};

const sendResetPasswordEmail = async (email, resetPasswordToken) => {
  const href = `${process.env.CLIENT_URL}/reset-password/${email}/${resetPasswordToken}`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your KidsFirst reset password link',
      text: '',
      html: `
              <div>
                  <h1>Reset your KidsFirst password</h1>
                  <p>To reset your password, please click the link below:</p>
                <a href='${href}'>click here</a>
                <p>*Note: This link will be automatically expired in 1 hour.</p>
              </div>
      `,
    });
  } catch (e) {
    return e;
  }
};
const sendInvitationEmail = async(email, family, emailVerificationToken,firstName) => {
  const href = `${process.env.CLIENT_URL}/register/${email}/${family}/${emailVerificationToken}`;
  try {
    // name of the Invitor in the email will be fetched from the form together
    //with the invitee email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject:
            `You have been invited by ${firstName} to register in Kids First app`,
      text: '',
      html: `
              <div>
                  <h1>You have been invited by ${firstName} to register 
                  in Kids First app</h1>
                  <p>To register on Kids First app, please click the link below:</p>
                <a href='${href}'>click here</a>
              </div>
      `,
    });
    return href;
  } catch (e) {
    return e;
  }
};

module.exports = { sendActivationEmail, sendResetPasswordEmail, sendInvitationEmail };
