const express = require('express');
const path = require('path');
const users = require('./users.json');

const app = express();

const PORT = process.env.PORT || 3005;

app.use('/',express.static(path.join(__dirname,'/public')));

app.use('/api/v1/users',(req,res)=>{
    res.json(users);
})


app.listen(PORT,()=>{
    console.log('Server running on port', PORT);
})