const express = require('express')
const router  = express.Router()

const room = require('../models/room')

router.get("/getallrooms" , async(req,res) => {
    try {
    const rooms = await room.find({}) 
        console.log(rooms)
        return res.json({rooms})
    } catch (error) {
        return res.status(400).json({message:error})
    }
    
});

module.exports = router;