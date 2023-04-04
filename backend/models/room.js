//const mongoose = require('mongoose')
import mongoose, { model, Schema } from "mongoose";

const roomSchema = mongoose.Schema({
    name:{
        type : String, required: true
    },
    maxCount :{
        type: Number , required: true
    },
    phoneNumber :{
        type: Number , required: true
    },
    rentperday :{
        type: Number , required: true
    },
    imageurls:[],
    currentbookings :[],
    type:{
        type: String, required: true
    },
    description:{
        type: String , required:true
    }
},{
    timestamps :true
})

export default model('room' , roomSchema)


// const roomModel = mongoose.model('room' , roomSchema)
// module.exports = roomModel