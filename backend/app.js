// 2:8:41

const express = require('express');
const app = express();
require("dotenv").config();
require("./connection/conn.js");
const cors = require("cors");
const UserAPI = require("./routes/user.js");
const TaskAPI = require("./routes/task.js")

app.use(cors());
app.use(express.json());


//http://localhost:1000/api/v1/sign-in
app.use("/api/v1",UserAPI);
app.use("/api/v2",TaskAPI);

app.use('/',(req,res)=> {
    res.send("hello from backend side");
});

const PORT=1000;

app.listen(PORT,() => {
    console.log("server started");
});