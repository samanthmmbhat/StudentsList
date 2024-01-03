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
    //     const customers = Student.find();
        
    //     const dateArray = customers.map(customer => (customer.date ? customer.date.toISOString().split('T')[0] : null));

    //     const invoiceCount = customers.length;
    //     const totalStudent = customers.reduce((total, customer) =>customer, 0);
    
    //     const summary = {
    //       date: dateArray,
    //       name:totalStudent
    //     };
    // const save = await customers.save();

    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date is required.' });
    }

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1); // Next day

    const students = await Student.find({
      date: { $gte: startDate, $lt: endDate },
    });

    res.json(students);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})







module.exports = route;