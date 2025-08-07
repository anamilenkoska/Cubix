const mysql = require('mysql2')
const express = require('express')
const bcrypt = require('bcrypt')


const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'SISIII2025_89231022',
})

conn.connect((err) => {
    if (err) {
        console.log('Error:' + err)
        return
    }
    console.log("Connection established")
})

let dataPool = {}
dataPool.allCubes = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Cube', (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.addUser = (username, email, password, role) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return reject(err)
            }
            conn.query('INSERT INTO User (username,email,password,role) VALUES (?,?,?,?)', [username, email, hashedPassword,role], (err, res) => {
                if (err) { return reject(err) }
                return resolve(res)
                console.log("received:",username,email,hashedPassword,role)
            })
        })

    })
}

dataPool.authUser=(username)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT * FROM User WHERE username=?', [username], (err,results)=>{
            if(err){return reject(err)}
            if(results.length===0){return resolve('No user found')}
            return resolve(results[0])
        })
    })
}

dataPool.getScramble=(cubeType)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT * FROM Scramble WHERE CubeType=? ORDER BY RAND() LIMIT 1',[cubeType], (err,res)=>{
            if(err){
                return reject(err)
            }
            return resolve(res[0])
        })
    })
}

dataPool.addAttempt=(userId,scrambleId,solving_time,solving_date)=>{
    return new Promise((resolve,reject)=>{
        conn.query('INSERT INTO Attempt (UserId,ScrambleId,Solving_time,Solving_date) VALUES (?,?,?,?)',[userId,scrambleId,solving_time,solving_date],(err,res)=>{
            if(err){ return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.getAlgorithm=(cubeType)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT * FROM Algorithm WHERE CubeType=?',[cubeType],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

module.exports = dataPool