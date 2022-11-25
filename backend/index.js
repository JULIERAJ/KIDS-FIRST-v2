const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const familyRoutes = require("./routes/family");
const invitationRoutes = require("./routes/invitation");
const loginRoutes = require("./routes/login");
const memberRoutes = require("./routes/member");
const registerRoutes = require("./routes/register");

require("dotenv").config({ path: "./.env.local" });

const mongoDB = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on("error", (error) => console.log("MongoDB connection error:", error));

db.once("connected", () => console.log("Database Connected"));

// middlewares
app.use(cors());
app.use(express.json());

app.use("api", router);
app.use("/api", familyRoutes);
app.use("/api", invitationRoutes);
app.use("/api", loginRoutes);
app.use("/api", memberRoutes);
app.use("/api", registerRoutes);

app.listen(PORT, () => console.log(`server started on ${PORT}`));
