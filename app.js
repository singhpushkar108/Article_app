const express = require('express'); // creating server
const app = express(); // creating an instance of the server
const router = require("./authRoute.js"); // an instance of the router

const cookieParser = require('cookie-parser');
//const cors =  require('cors');

app.use(express.json()); //parsing the json file recieved from the body
app.use(cookieParser()); // parsing incoming cookies from the HTTP request header

app.use(express.urlencoded({ extended: true })); // Middleware to parse incoming request bodies in urlencoded format

//app.use(cors({origin:[parser.env.CLIENT_URL],credentials:true})); //specifies the allowed origin(s) from which requests are allowed to be made to your server

app.use(express.static('../frontend/'));

app.use('/api/auth',router);

app.get('*', (req, res) => {
  res.status(404).redirect("./Not-found.html");
});


module.exports=app;