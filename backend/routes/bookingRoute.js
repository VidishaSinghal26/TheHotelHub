import { Router } from "express";
import Booking from '../models/booking'
import Room from "../models/room";

const router = Router();

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body
 // let newbooking
  try {
   const  newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate ,
      todate,
      totalamount,
      totaldays,
      transactionId: '1234'
    })
    const booking = await newbooking.save();

    const roomtemp = await Room.findOne({ _id: room._id });

    roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate , todate:todate, userid: userid  , status : booking.status});
    console.log(roomtemp)
    await roomtemp.save();

    res.send("Room booked ")
   
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err});
  }

  // if (!newbooking) {
  //   return res.status(500).json({ message: "Unexpected Error Occured" });
  // }

  // return res.status(201).json({ newbooking });
})

export default router;