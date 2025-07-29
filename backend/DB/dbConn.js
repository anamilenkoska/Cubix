const mysql=require('mysql2')
const express=require('express')

const conn=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:'SISIII2025_89231022',
})

conn.connect((err)=>{
    if(err){
        console.log('Error:'+err)
        return
    }
    console.log("Connection established")
})

let dataPool={}
dataPool.allCubes=()=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT * FROM Cube', (err,res)=>{
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

module.exports=dataPool