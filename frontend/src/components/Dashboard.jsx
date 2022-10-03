import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Dashboard (){
  const [inviteeEmail, setInviteeEmail] = useState("");

  const storedUser = localStorage.getItem("storedUser");
  const parsedUser = JSON.parse(storedUser);


  function handleInvitation (e){
    e.preventDefault();

    axios.post()
  }



  return (
    <div>
      dashboard page ===
      you want to invite a person to the family as a principle 
      <br></br>
      hello {parsedUser.m1.firstname}

      <Form onSubmit={handleInvitation}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> invited person email address </Form.Label>
            <Form.Control
              type="email"
              placeholder="invited person email address "
              onChange={(e) => inviteeEmail(e.target.value)}
            />
          </Form.Group>


          <Button variant="primary" type="submit">
            invite
          </Button>
        </Form>
    </div>
  )
} 