import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { sendInvitation } from "../api";

export default function Dashboard() {
  const [inviteeEmail, setInviteeEmail] = useState("");
  // const [invitationUrl, setInvitationUrl] = useState("");

  const emailJSForm = useRef();

  const storedUser = localStorage.getItem("storedUser");
  const parsedUser = JSON.parse(storedUser).m1;

 


  const invitationUrl = `http://localhost:3000/register?inviteeEmail=${inviteeEmail}&family=${parsedUser.family}`;
  console.log("invitation url is: ", invitationUrl);

  function handleInvitation(e) {
    e.preventDefault();

    sendInvitation({
      invitor: parsedUser.principle,
      family: parsedUser.family,
      inviteeEmail: inviteeEmail,
      invitationUrl: invitationUrl,
    })
      .then((res) => {
        console.log("posted");
        emailjs

          // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
          .sendForm(
            "service_60w5krl",
            "template_4jj345i",
            emailJSForm.current,
            "_0Rdze2icQo-Gkevw"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      })
      .catch((e) => console.log(e));
  }

  return (
    <div>
      dashboard page === you want to invite a person to the family as a
      principle
      <br></br>
      hello {parsedUser.firstname}
      <Form onSubmit={handleInvitation} ref={emailJSForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> family name </Form.Label>
          <Form.Control type="text" value={parsedUser.family} name="family" />
          <br></br>

          <Form.Label> invitor name </Form.Label>
          <Form.Control
            type="text"
            value={parsedUser.principle}
            name="invitor"
          />
          <br></br>

          <Form.Label> register url </Form.Label>
          <Form.Control
            type="text"
            value={invitationUrl}
            name="invitationUrl"
          />
          <br></br>

          <Form.Label> invited person email address </Form.Label>
          <Form.Control
            type="email"
            placeholder="invited person email address "
            onChange={(e) => setInviteeEmail(e.target.value)}
            name="inviteeEmail"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          invite
        </Button>
      </Form>
    </div>
  );
}
