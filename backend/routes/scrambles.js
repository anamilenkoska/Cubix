const express = require('express')
const scrambles = express.Router()
const DB = require('../DB/dbConn.js')

scrambles.get('/scrambles/:cubeType/:difficulty',async(req,res)=>{
    const {cubeType,difficulty}=req.params
    try{
        const scramble=await DB.getScramble(cubeType,difficulty)
        if(!scramble){
            return res.status(404).json({message:'no scramble found'})
        }
        res.json(scramble)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports=scrambles