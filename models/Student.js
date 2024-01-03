const mongoose = require('mongoose')

const createStudent = new mongoose.Schema({
    name:String,
    age:Number,
    grade:String,
    date:Date
})

const student = mongoose.model('Student',createStudent);

module.exports = student;