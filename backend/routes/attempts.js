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

        const attemptId=result.insertId;
        const stats=await DB.getStats(userId)
        const pb=stats.pb
        const average_time=stats.average
        const supervisorId=await DB.getSupervisor();
        await DB.addReport(userId,pb,average_time,supervisorId,attemptId)

        res.status(201).json({message:'Attempt saved',result})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Data base error:',err})
    }
})

attempts.get('/stats/:userId',async(req,res)=>{
    const userId=req.params.userId
    try{
        const stats=await DB.getStats(userId)
        res.json(stats)
    }catch(err){
        res.status(500).json({message:'Error: ',err})
    }
})

attempts.get('/last/:userId',async(req,res)=>{
    try{
        const data=await DB.getReport(req.params.userId)
        if(!data){
            return res.status(400).json({message:'No attempts found'})
        }
        res.json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Database error"})
    }
})

module.exports=attempts;