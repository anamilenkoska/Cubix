const express=require('express')
const DB=require('../DB/dbConn.js')
const profiles=express.Router()

profiles.get('/:userId',async(req,res)=>{
    const userId=req.params.userId
    try{
        const data=await DB.viewProfile(userId)
        if(!data){
            return res.status(400).json({message:'Profile not found'})
        }
        res.json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Database error'})
    }
})

module.exports=profiles