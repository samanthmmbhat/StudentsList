const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

app.use(bodyparser.json());
mongoose.connect('mongodb://localhost:27017/studentCrud')

const createStudent = require('./router/creaStudent');
app.use('/api/Student',createStudent);

app.listen(8081,()=>{
    console.log('server listing port 8081')
})