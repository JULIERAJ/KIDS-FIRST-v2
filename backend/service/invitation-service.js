const Invitation = require("../models/Invitation");

const invitation = async (invitor, family, inviteeEmail, invitationUrl) => {
    try {
        const invitation = await new Invitation({
            invitor,
            family,
            inviteeEmail,
            invitationUrl,
        });
        await invitation.save();
        console.log("invitation is", invitation);
        return invitation;
    } catch (e) {
        console.log(e);
    }
};

module.exports = { invitation };
