// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// import { createFamily } from '../api';

// export default function Family() {
//   const [familyName, setFamilyName] = useState('');
//   // const [firstName, setFirstName] = useState("");
//   // const [lastName, setLastName] = useState("");

//   function handleCreateFamily(e) {
//     e.preventDefault();
//     // check backend if there is any duplicate 
//     // family names + principle name - combined primary key ???
//     // create family name in the backend

//     const storedUser = localStorage.getItem('storedUser');
//     const parsedUser = JSON.parse(storedUser);

//     createFamily({
//       familyName,
//       principleId: parsedUser.id,
//     })
//       .then((res) => {
//         const user = JSON.stringify(res.data);
//         localStorage.setItem('storedUser', user);
//         window.location.href = '/member';
//       });
//     // .catch((e) => console.log(e));
//   }

//   return (
//     <div>
//       {/* conditional --- for invited co-parent .. in the cookie / 
//       session it should already show which family they belong to */}
//       <span>
//         for the invited co-parent: *family page - is this family ? if yes,
//         please click: box of family*
//       </span>
//       <br></br>
//       <span>===========</span>

//       <div>
//         for principle to create a new family: create a new family
//         <Form onSubmit={handleCreateFamily}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Create Family Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter new family name"
//               onChange={(e) => setFamilyName(e.target.value)}
//             />
//           </Form.Group>

//           {/* <br></br>
//           <span>===========</span> */}

//           {/* <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label> your first name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter new family name"
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>your last name </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter new family name"
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </Form.Group> */}

//           <Button variant="primary" type="submit">
//             create family
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }
