const express = require("express");
const app = express();

const Authrouters=require("./Routers/Authrouters")
require("./models/db");
require("dotenv").config();

const bodyparse = require("body-parser");
const cors = require("cors");

app.use(bodyparse.json());
app.use(cors());

const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("hello");
});

app.use('/auth',Authrouters)

app.listen(port, () => {
  console.log("Server is running");
});
