const express=require("express");
require("./models/Users")
const app=express();
require("dotenv").config();

const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("hello");
})

app.listen(port,()=>{
    
    console.log("Server is running")
})