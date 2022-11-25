const invitationService = require("../service/invitation-service");

const invitation = async (req, res) => {
    try {
        console.log("========invitation: ", req.body);
        const { invitor, family, inviteeEmail, invitationUrl } = req.body;
        console.log(invitor, family, inviteeEmail, invitationUrl);
        console.log("welcome to the backend of the invitation ");

        const i1 = await invitationService.invitation(
            invitor,
            family,
            inviteeEmail,
            invitationUrl
        );
        res.send({ i1 });
    } catch (e) {
        console.log(e);
    }
};

module.exports = { invitation };
