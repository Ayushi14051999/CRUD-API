const express= require('express');
const dotenv=require("dotenv").config();
const PORT =process.env.PORT;
const app=express();

const db=require("./config/mongoose");
app.use(express.json());
app.use("/",require("./routes"));




//Starting a server
app.listen(PORT);