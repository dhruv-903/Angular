const express = require('express');
const connect  = require('./db')
connect();
const app = express()

app.use(express.json())
app.use('/',require('./routes/routes.js'))

app.listen(3000,(req,res)=>{
    console.log("Your server is running on port 3000")
})