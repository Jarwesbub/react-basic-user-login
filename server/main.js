require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login_route");
const signUpRoute = require("./routes/signUp_route");
const deleteUserRoute = require("./routes/deleteUser_route");
const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send({message:"hello from google app engine"});
    res.end();
  });

app.use("/login", loginRoute);
app.use("/signup", signUpRoute);
app.use("/deleteuser", deleteUserRoute);


const PORT = process.env.PORT;
app.listen(PORT);