const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();

dotenv.config();

connectDB();

app.get('/',(req,res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT

app.listen(PORT,console.log("Server started on port: ",PORT));