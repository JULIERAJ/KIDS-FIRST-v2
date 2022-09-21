import axios from "axios";
import { useState  } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Family (){
   const [familyName, setFamilyName] = useState("");

   console.log(familyName);

   function handleCreateFamily (e) {
    e.preventDefault(); 
     // check backend if there is any duplicate family names + principle name - combined primary key ??? 
    // create family name in the backend 

    const storedUser = localStorage.getItem("storedUser");
    const parsedUser = JSON.parse(storedUser);
    console.log("======storeduser: ", parsedUser.id);


    axios.post('http://localhost:8000/api/family', {familyName, principleId: parsedUser.id})
    .then (()=> console.log("posted"))
    .catch(e => console.log(e))


   }
   

  return(
    <div> 
      {/* conditional --- for invited co-parent .. in the cookie / session it should already show which family they belong to */}
      <span>
      for the invited co-parent: 
      *family page - is this family ? if yes, please click: 
      
      box of family*
      </span>
      <div>
        for principle to create a new family: 
        create a new family

        <Form onSubmit={handleCreateFamily}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Create Family Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new family name"
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </Form.Group>

      
          <Button variant="primary" type="submit">
            Create a new family 
          </Button>
        </Form>
      </div>

    </div>
  )

}