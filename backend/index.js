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
const Invitation = require('./model/Invitation');

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
    const m1 = new Member({ family: familyId, principle: principleId, firstname: firstname, lastname: lastname });
    await m1.save();
    console.log("m1 is", m1);
    res.send({m1});
  }
});

app.post("/api/invitation", async (req, res) => {
  console.log("========invitation: ", req.body);
  const  {invitor, family, inviteeEmail, invitationUrl}= req.body;
  console.log(invitor, family, inviteeEmail, invitationUrl); 
  console.log ("welcome to the backend of the invitation ");
  await mongoose.connect(uri);

  const i1 = new Invitation({ invitor, family, inviteeEmail, invitationUrl});
  await i1.save();
  console.log("i1 is", i1);
  res.send({i1});
});






