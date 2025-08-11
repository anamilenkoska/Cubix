// const express=require('express')
// require('dotenv').config()
// const app=express()
// const port=process.env.PORT || 8886
// const cors=require('cors')
// const DB=require('./DB/dbConn.js')
// const session=require('express-session')

// app.use(express.json())
// app.use(express.urlencoded({extended : true}));
// app.use(cors({
//    origin: 'http://88.200.63.148:3004',
//    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
//    credentials: true
// }))
// app.use(session({
//     secret:'secret_key',
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         httpOnly:true,
//         maxAge:1000*60*60,
//         secure:false
//     }
// }))

// //shows the info of the db in the browser
// app.get('/',async (req,res)=>{
//     //res.send("welcome")
//     try{
//         const cubes=await DB.allCubes();
//         res.json(cubes)
//     }catch(error){
//         console.log(error)
//         res.sendStatus(500)
//     }
// })

// app.listen(process.env.PORT || port, ()=>{
//     console.log(`Server is running on port: ${process.env.PORT || port}`)
// })

// const users=require('./routes/users')
// app.use('/users',users)

// const scrambles=require('./routes/scrambles')
// app.use(scrambles)

// const attempts=require('./routes/attempts');
// app.use('/attempts',attempts)

// const algorithms=require('./routes/algorithms')
// app.use('/algorithms',algorithms)

// const profile=require('./routes/profiles')
// app.use('/profile',profile)


const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const DB = require('../DB/dbConn.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
}));

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60, secure: false }
}));

// Routes
app.get('/', async (req, res) => {
    try {
        const cubes = await DB.allCubes();
        res.json(cubes);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.use('/users', require('../routes/users'));
app.use(require('../routes/scrambles'));
app.use('/attempts', require('../routes/attempts'));
app.use('/algorithms', require('../routes/algorithms'));
app.use('/profile', require('../routes/profiles'));

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);