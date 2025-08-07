const express = require('express')
const algorithms = express.Router()
const DB = require('../DB/dbConn.js')

algorithms.get('/:cubeType',async(req,res)=>{
    const {cubeType}=req.params
    try{
        const results=await DB.getAlgorithm(cubeType)
        res.status(200).json(results)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Failed to fetch algorithms',err})
    }
})

module.exports=algorithms;