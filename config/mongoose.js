const mongoose=require('mongoose');

const dotenv = require("dotenv").config();
const key = process.env.mongoURI;
mongoose.connect(key,{
    useNewUrlParser: false
});

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to DB"));

db.once('open',()=>console.log("Connected to DB"));

module.exports=db;