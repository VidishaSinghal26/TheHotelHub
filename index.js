const express = require('express')

const app = express();

const connectDB = require('./db')
connectDB()

const roomsRoute = require('./routes/roomsRoute')
app.use('./api/rooms' , roomsRoute)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node Server Started"))



























// // const connectToMongo = require('./db');
// // const express = require('express');
// // const mongoose = require('mongoose');


// // connectToMongo();
// // const app = express()
// // const port = 3000

// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
// // })
// //

// // const connectDB =  ()=>{
// //      mongoose.connect ('mongodb+srv://Vidisha:vidish@@cluster0.qzyclx9.mongodb.net/test/hotel-rooms');    
// // };

// // connectDB();

// // app.listen(port, ()=> console.log("Node Server Started"))

// const connectToMongo = require('./db')
// const express = require('express')

// connectToMongo();
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//       res.send('Hello World!')
//     })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })


