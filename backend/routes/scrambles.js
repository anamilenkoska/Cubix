const express = require('express')
const scrambles = express.Router()
const DB = require('../DB/dbConn.js')

scrambles.get('/scrambles/:cubeType',async(req,res)=>{
    const {cubeType}=req.params
    try{
        const scramble=await DB.getScramble(cubeType)
        res.json(scramble)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports=scrambles