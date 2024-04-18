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

// function that sends a general email
const sendGeneralEmail = async (email, subject, greetingText, messageText, buttonText, endText, href) => {
  const htmlContent = await renderTemplate('body', { greetingText, messageText, buttonText, endText, href });
  await sendEmail(email, subject, htmlContent);
};

//function that sends verification email with the link
const sendActivationEmail = async (email, emailVerificationToken) => {
  const href = `${process.env.CLIENT_URL}/activate/${email}/${emailVerificationToken}`;
  const subject = 'KIDS FIRST Account Verification';
  const greetingText = 'Hello and welcome to KIDS FIRST!';
  const messageText = 'To continue the registration process, please click Verify My Account.';
  const endText = 'If you don’t use this link within 1 hour, it will expire.';
  const buttonText = 'Verify My Account';
  await sendGeneralEmail(email, subject, greetingText, messageText, buttonText, endText, href);
};

// function that sends reset password email with the link
const sendResetPasswordEmail = async (email, resetPasswordToken) => {
  const href = `${process.env.CLIENT_URL}/reset-password/${email}/${resetPasswordToken}`;
  const subject = '[Kids First] Please reset your password';
  const greetingText = 'Reset your KIDS FIRST password'; 
  const messageText = 'We heard that you lost your KIDS FIRST password, sorry about that! ' + 
  'But don’t worry you can use the following button to reset your password:';
  const endText = 'If you don’t use this link within 3 hours, it will expire.';
  const buttonText = 'Reset Your Password';
  await sendGeneralEmail(email, subject, greetingText, messageText, buttonText, endText, href);
};

// function that sends invitation email with the link
const sendInvitationEmail = async (email, family, emailVerificationToken, firstName) => {
  const href = `${process.env.CLIENT_URL}/register/${email}/${family}/${emailVerificationToken}`;
  const subject = `You have been invited by ${firstName} to register in Kids First app`;
  const greetingText = '';
  const messageText = `You have been invited by ${firstName} to register in Kids First app. 
  To register on Kids First app, please click the link below:`;
  const endText = '';
  const buttonText = 'Click Here';
  await sendGeneralEmail(email, subject, greetingText, messageText, buttonText, endText, href);
};

module.exports = { sendActivationEmail, sendResetPasswordEmail, sendInvitationEmail };