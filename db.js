const mongoose = require('mongoose');

var mongoURI = 'mongodb+srv://Vidisha:vidisha@cluster0.mgwgzxk.mongodb.net/hotel-rooms' 

// To connect with mongoDB server

        // const connectToMongo =  async () => {
        //     try {
        //         await mongoose.connect(mongoURI, console.log("Mongos erver connected"));
        //       } 
        //       catch (error) {
        //         console.log(error);
        //       }
        //     }

    //OR

//the second alternative method to connect mongoDB

const connectToMongo =  () => {
     mongoose.connect(mongoURI)
     .then( ()=>
        console.log("Connected to mongo Successful")
    )
}


module.exports = connectToMongo;

// mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} )




// var connection = mongoose.connection;

// connection.on('connected' , ()=>{
//     console.log('Mongo DB Connection Successful')
// });

// connection.on('error', ()=>{
//     console.log('Mongo DB Connection failed')
// });

// module.exports  = mongoose;




   



