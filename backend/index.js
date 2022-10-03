const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log("server started on 8000");
});

const uri =
  "mongodb+srv://yb007:o4W4RLfE6v1IGHza@cluster0.58mdmyi.mongodb.net/?retryWrites=true&w=majority";

// async function main() {
//   try {
//     await mongoose.connect(uri);
//     console.log("connected to the mongodb");
//   } catch (e) {
//     console.log("did not connect to mongodb", e);
//   }
// }

// main();


const Principle = require("./model/Principle");
const Family = require("./model/Family");
const Member = require("./model/Member");
// const Invitation = require('./model/Invitation');

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  // res.send({ message: "received in the backend " });
  console.log ("welcome to the backend of the register");
  await mongoose.connect(uri);
  // if cannot find the same email in the system then create the new user
  const checkDuplicate = await Principle.findOne({ email }).exec();
  if (checkDuplicate) {
    console.log("backend duplicate ");
    res.status(401).send({ message: "This user already exist" });
  } else {
    const p1 = new Principle({ email, password });
    await p1.save();
    console.log("p1 is", p1);
    res.send({id: p1._id, email: p1.email});
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  // res.send({ message: "received in the backend " });

  await mongoose.connect(uri);
  // find that user in the database
  const foundUser = await Principle.findOne({ email, password }).exec();

  if (foundUser) {

    // send the user information to the front end including names , family info .. etc 
    console.log("foundit");
  } else {
    // send error message to the front end 
    console.log("check the username and password again");
  }
});


app.post("/api/family", async (req, res) => {
  console.log("========", req.body);
  const {familyName} = req.body;
  const principleId = req.body.principleId; 
  console.log(familyName, principleId); 
  console.log ("welcome to the backend of the family");
  await mongoose.connect(uri);
  // if cannot find the same email in the system then create the new user
  const checkDuplicate = await Family.findOne({ familyName, principle: principleId}).exec();
  if (checkDuplicate) {
    console.log("backend duplicate ");
    res.status(401).send({ message: "This user already exist" });
  } else {
    // 1) if there is such familyname, but no that person name , check if that person is invitated, if so add 
    // 2) if there is no such family name, then create a new family with that principle 
    const f1 = new Family({ familyName, principle: principleId });
    await f1.save();
    console.log("f1 is", f1);
    res.send({principleId: principleId, familyId: f1._id});
  }
});

app.post("/api/member", async (req, res) => {
  console.log("========member: ", req.body);
  const  {firstname, lastname, principleId, familyId}= req.body;
  console.log(familyId, principleId, firstname, lastname); 
  console.log ("welcome to the backend of the member");
  await mongoose.connect(uri);
  // if cannot find the same user in the same family  then create the new member 
  const checkDuplicate = await Member.findOne({ family: familyId, principle: principleId, firstname, lastname}).exec();
  if (checkDuplicate) {
    console.log("backend duplicate ");
    res.status(401).send({ message: "This user already exist in this family" });
  } else {
    // 1) if there is such familyname, but no that person name , check if that person is invitated, if so add 
    // 2) if there is no such family name, then create a new family with that principle 
    console.log("else");
    const m1 = new Member({ family: familyId, principle: principleId, firstname: firstname, lastname: lastname });
    await m1.save();
    console.log("m1 is", m1);
    res.send({m1});
  }
});











// async function main() {
//   try {
//     await mongoose.connect(uri);
//     console.log("connected to the mongodb");

// parent 1 created an account
// const p1 =  new Principle({email: "TEST@test.com", password: "1234"});
// await p1.save();
// console.log("p1 is" , p1);

// parent 1 created a family name
// const f1 = new Family({principle: ['63268f7e1a07b2b3cdfe8a7d'], familyName: '123Family'});
// await f1.save();
// console.log("f1 is", f1);

// parent 1 added some members
// const member_mother = new Member({
//   family: '63268fedfe421ddbddbdc6bc',
//   principle: '63268f7e1a07b2b3cdfe8a7d',
//   firstname: "angelia",
//   lastname: "jolie",
//   dateOfBirth: "1963-09-18T03:26:36.331+00:00",
//   relationship: "mother"
// })
// await member_mother.save();
// console.log("member_mother is ", member_mother);

// const member_child1 = new Member({
//   family: '63268fedfe421ddbddbdc6bc',
//   firstname: "angelia's kid",
//   lastname: "jolie's kid",
//   dateOfBirth: "2003-09-18T03:26:36.331+00:00",
//   relationship: "kid",
//   allergy: "peanut",
//   dislike: "fish"

// })
// await member_child1.save();
// console.log("member_child1 is ", member_child1);

// added one co-parent and assigned that co-parent as principle, aka who needs to login/logout
// const jolie_invitation = new Invitation({
//   invitor: '63268f7e1a07b2b3cdfe8a7d',
//   inviteeEmail: 'bradpitt@gmail.com'
// })
// await jolie_invitation.save();
// console.log("jolie's invite", jolie_invitation);

// research: the co-parent will receive an invitation email

// todo: the co-parent created an account, and successfully check the dashboard information

// todo: build routes and connect with the frontend

//   } catch (e) {
//     console.log("did not connect to mongodb", e);

//   }
// }

// main();