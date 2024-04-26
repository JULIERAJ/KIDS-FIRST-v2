const ejs = require('ejs');
const nodemailer = require('nodemailer');

const path = require('path');

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

//function to render the email template using EJS
const renderTemplate = (templateName, data) => {
  const templatePath = path.join(__dirname, '..','templates', `${templateName}.ejs`);
  return ejs.renderFile(templatePath, data);
};

//function that sends email using nodemailer
const sendEmail = async (email, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: htmlContent,
      attachments: [{
        filename: 'kids_first_logo_beta.png',
        path: '../frontend/src/media/logo/kids_first_logo_beta.png',
        cid: 'logo'
      }]
    });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Failed email details:', { email, subject, htmlContent });
    throw error; // rethrow the error to propagate it up the call stack
  }
};

//function that sends verification email with the link
const sendActivationEmail = async (email, emailVerificationToken) => {
  const data = {
    email,
    emailVerificationToken,
    href: `${process.env.CLIENT_URL}/activate/${email}/${emailVerificationToken}`
  };

  const htmlContent = await renderTemplate('activation-mail', data);
  const subject = 'KIDS FIRST Account Verification';
  await sendEmail(email, subject, htmlContent);
};

// function that sends reset password email with the link
const sendResetPasswordEmail = async (email, resetPasswordToken) => {
  const data = {
    email,
    resetPasswordToken,
    href: `${process.env.CLIENT_URL}/reset-password/${email}/${resetPasswordToken}`
  };

  const htmlContent = await renderTemplate('reset-password-mail', data);
  const subject = '[Kids First] Please reset your password';
  await sendEmail(email, subject, htmlContent);
};

// function that sends invitation email with the link
const sendInvitationEmail = async (email, family, emailVerificationToken, firstName) => {
  const data = {
    email,
    family,
    emailVerificationToken,
    firstName,
    href: `${process.env.CLIENT_URL}/register/${email}/${family}/${emailVerificationToken}`
  };

  const htmlContent = await renderTemplate('invitation-mail', data);
  const subject = `You have been invited by ${firstName} to register in Kids First app`;
  await sendEmail(email, subject, htmlContent);
};

module.exports = { sendActivationEmail, sendResetPasswordEmail, sendInvitationEmail };
