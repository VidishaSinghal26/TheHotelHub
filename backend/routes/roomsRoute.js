import { Router } from "express";
import { getallrooms} from "../controller/roomController";


// const express = require('express')
// const getallrooms = require('../controller/roomController')
//import room from '../models/room'

const router  = Router()

router.get("/",getallrooms);

// router.get("/getallrooms" , async(req,res) => {
//     try {
//     const rooms = await room.find({}) 
//         console.log(rooms)
//         return res.json({rooms})
//     } catch (error) {
//         return res.status(400).json({message:error})
//     }
    
// });


export default router;
//module.exports = router;