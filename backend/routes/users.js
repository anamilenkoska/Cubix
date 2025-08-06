const express = require('express')
const users = express.Router()
const DB = require('../DB/dbConn.js')
const bcrypt=require('bcrypt')

users.post('/signin', async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const role=req.body.role

    if (username && email && password && role) {
        try {
            let queryResult = await DB.addUser(username, email, password, role);
            if (queryResult.affectedRows) {
                const user=await DB.authUser(username)
                if(!user){
                    return res.status(500).json({message:'user added but cannot fetch data'})
                }
                req.session.user={
                    id:user.UserId,
                    username:user.username,
                    role:user.role
                }
                const userResponse={
                    id:user.UserId,
                    username:user.username,
                    role:user.role
                }
                console.log("User signed in")
                res.status(201).json({message:'User signed in', user:userResponse})
            } else {
                console.log("Provide username, email, password and role")
                res.status(500).json({message:'Failed to add user'})
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500).json({ message: "Server error" });
        }
    } else {
        console.log("Please enter all fields")
        res.status(204)
    }
    res.send()
})

users.post('/login', async (req, res) => {
    var username = req.body.username
    var password = req.body.password

    if(username && password){
        try{
            const user=await DB.authUser(username)
            if(!user){
                return res.status(401).json({message:'User not found'})
            }
            const passMatch=await bcrypt.compare(password, user.password)
            if(!passMatch){
                return res.status(401).json({message:'Wrong password'})
            }
            req.session.user={
                id:user.UserId,
                username:user.username,
                role:user.role
            }
            return res.status(200).json({message:'User loged in',user:req.session.user})
        }catch(err){
            console.log(err)
            res.status(500)
        }
    }else{
        return res.status(400).json({message:"Provide username and password"})
    }
    res.send()
})

users.get('/session', async(req,res,next)=>{
    // try{
    //     console.log("session data: ")
    //     console.log(req.session)
    //     res.json(res.session)
    // }catch(e){
    //     console.log(e)
    //     res.sendStatus(500)
    //     next()
    // }
    if(req.session.user){
        res.status(200).json({user:req.session.user})
    }else{
        res.status(401).json({message:'Not logged in'})
    }
})

users.get('/logout', async(req,res,next)=>{
    try{
        req.session.destroy(function(err){
            res.json({status:{success:true,msg:err}})
        })
    }catch(e){
        console.log(e)
        res.json({status:{success:false,msg:e}})
        res.sendStatus(500)
        next()
    }
})

module.exports = users