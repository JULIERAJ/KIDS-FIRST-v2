import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Family() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  console.log(firstname, lastname);

  function handleCreateMember(e) {
    e.preventDefault();
    // check backend if there is any duplicate family names + principle name - combined primary key ???
    // create family name in the backend

    const storedUser = localStorage.getItem("storedUser");
    const parsedUser = JSON.parse(storedUser);
    // console.log("======storeduser: ", parsedUser);

    axios
      .post("http://localhost:8000/api/member", {
        firstname,
        lastname,
        principleId: parsedUser.principleId,
        familyId: parsedUser.familyId
      })
      .then((res) => {
        console.log("posted");
        const user = JSON.stringify(res.data);
        console.log (user);
        localStorage.setItem("storedUser", user);
        window.location.href = "/dashboard";
      })
      .catch((e) => console.log(e));
  }

  return (
    <div>

      <div>
        <Form onSubmit={handleCreateMember}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> your first name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>your last name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            create family member
          </Button>
        </Form>
      </div>
    </div>
  );
}
