const express=require('express')
require('dotenv').config()
const app=express()
const port=process.env.PORT || 8886
const cors=require('cors')
const DB=require('./DB/dbConn.js')

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors({
   origin: 'http://88.200.63.148:3000',
   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
   credentials: true
}))

//shows the info of the db in the browser
app.get('/',async (req,res)=>{
    //res.send("welcome")
    try{
        const cubes=await DB.allCubes();
        res.json(cubes)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
})

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})

const users=require('./routes/users')
app.use('/users',users)

