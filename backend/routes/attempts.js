const DB=require('../DB/dbConn.js')
const express = require('express')
const attempts = express.Router()

attempts.post('/',async(req,res)=>{
    const {userId,scrambleId,solving_time,solving_date}=req.body;
    if(!userId || !scrambleId || !solving_time || !solving_date){
        return res.status(400).json({message:'missing data'})
    }
    try{
        const result=await DB.addAttempt(userId,scrambleId,solving_time,solving_date)
        res.status(201).json({message:'Attempt saved',result})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Data base error:',err})
    }
})

module.exports=attempts;