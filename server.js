require('dotenv').config(); //importing the .env module
const express=require('express');// creating the server
const app= require('./app.js'); // creating the instance of the server
const mongoose=require('mongoose');
const port = process.env.PORT || 5000;




mongoose.connect('mongodb+srv://Pushkar:qwerty1234@testdb.4baufmb.mongodb.net/')
.then(()=>{
    
    app.listen(port,()=>{
    console.log(`Server running at port: ${port}. Connected to database`);
    });
})
.catch((error)=>{
    console.log(error);
    console.log("something went wrong . Unable to connect to database");
});