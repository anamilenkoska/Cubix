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
//    origin: 'http://88.200.63.148:3002',
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
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // load env from backend/.env
const DB = require('../DB/dbConn.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup (adjust origin as needed)
app.use(cors({
  origin: 'http://88.200.63.148:3002',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  credentials: true
}));

// Session setup
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: false
  }
}));

// Example root route
app.get('/', async (req, res) => {
  try {
    const cubes = await DB.allCubes();
    res.json(cubes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Routes
const users = require('../routes/users');
app.use('/users', users);

const scrambles = require('../routes/scrambles');
app.use(scrambles);

const attempts = require('../routes/attempts');
app.use('/attempts', attempts);

const algorithms = require('../routes/algorithms');
app.use('/algorithms', algorithms);

const profile = require('../routes/profiles');
app.use('/profile', profile);

// Export as serverless function
module.exports = serverless(app);
