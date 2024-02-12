const jwt = require('jsonwebtoken');

const emailService = require('../service/email-service');
const invitationService = require('../service/invitation-service');
const principleService = require('../service/principle-service');

const invitation = async (inviter, family, inviteeEmail, firstName, inviteeInviteLater) => {
  if (!inviteeInviteLater) {
    try {
      let duplicate = await invitationService.findInviteeDuplcate(inviteeEmail, family);

      if (duplicate) {
        const emailVerificationToken = await jwt.sign(
          { inviteeEmail },
          process.env.JWT_EMAIL_VERIFICATION_SECRET,
          { expiresIn: '24h' }
        );

        await emailService.sendInvitationEmail(
          inviteeEmail,
          family,
          emailVerificationToken,
          firstName
        );
        /* return res
          .status(200)
          .json({
            message: `Invitation email to ${inviteeEmail} is sent`,
          });
          */ 
      } 
      
      if (!duplicate) {
        const emailVerificationToken = await jwt.sign(
          { inviteeEmail },
          process.env.JWT_EMAIL_VERIFICATION_SECRET,
          { expiresIn: '24h' }
        );

        const invitationURL = await emailService.sendInvitationEmail(
          inviteeEmail,
          family,
          emailVerificationToken,
          firstName
        );
        /*return res.status(201).json({
          message: 'Invitation email is sent',
          inviteeEmail: inviteeEmail,
        });*/ 

        /* eslint-disable no-unused-vars */
        const invitee = await invitationService.createInvitation(
          inviter,
          family,
          inviteeEmail, 
          invitationURL
        );
      }
    } catch (e) {
      // return res.status(500).json('something went wrong');
    }
  }
};

const invitationAccepted = async (req, res) => {
  const emailToken = req.params.emailVerificationToken;
  const email = req.params.email;

  try {
    const invitation = await invitationService.findInviteeEmail(email);

    if (invitation.invitationAccepted === true) {
      return res.status(200).json({
        message: 'Invitation has been accepted, proceed to registration',
        email: invitation.inviteeEmail,
        invitationAccepted: invitation.invitationAccepted,
      });
    }
    
    const activationTokenVerified = await principleService.emailTokenVerification(emailToken);

    if (!activationTokenVerified) {
      return res
        .status(400)
        .json({ message: 'invitation link is not correct' });
    } else {
      const invitationData = await invitationService.acceptedInvitation(email);
      return res.status(200).json({
        message: 'the invitation is successfully accepted',
        email: invitationData.inviteeEmail,
        invitationAccepted: invitationData.invitationAccepted,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { invitation, invitationAccepted };
