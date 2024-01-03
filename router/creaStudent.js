const express = require('express')
const route = express.Router();
const Student = require('../models/Student');

route.post('/',async(req,res)=>{
    try{
    const {name,age,grade,date} = req.body;

    const student = new Student({name,age,grade,date})

    const createStudent = await student.save()

    res.json({createStudent})
    }catch(error){
      res.status(500).json({error:error.message})
    }
})


route.get('/',async(req,res)=>{
    try{
     const student = await Student.find();
     res.json(student)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

route.delete('/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const student = await Student.findByIdAndDelete(id);
    res.json(student)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

route.put('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const updatedStudent = req.body;
        const student = await Student.findByIdAndUpdate(id,updatedStudent,{new:true})
        res.json(student)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

route.get('/sumarry',async(req,res)=>{
    try {
    const uniqueDates = await Student.distinct('date');
   
    const summary = await Promise.all(
      uniqueDates.map(async (date) => {
        const students = await Student.find({ date });
        const studentNames = students.map((student) => student.name);
        return { date, studentNames };
      })
    );
    res.json(summary);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})







module.exports = route;