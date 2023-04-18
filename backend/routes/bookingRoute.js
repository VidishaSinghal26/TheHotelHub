import { Router } from "express";
const router = Router();
import Booking from '../models/booking'
//const Booking = require('../models/booking')
import Room from "../models/room";
import { v4 as uuidv4 } from 'uuid';
//const stripe = require('stripe')('sk_test_51MxSFxSDImWCEH67YT4K9A0fUxM5TBBmix99aNxOi1JPjitzK07zMfYPUQt3m06WGyVanT85yR2n7rOGoNCMyyWy00OIq7y6Tw')
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MxSFxSDImWCEH67YT4K9A0fUxM5TBBmix99aNxOi1JPjitzK07zMfYPUQt3m06WGyVanT85yR2n7rOGoNCMyyWy00OIq7y6Tw');
// import stripe from 'stripe';
// import stripe from  ''


router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token} = req.body
   
  try{
    console.log('1st')
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const payment = {
      amount: totalamount * 100,
      currency: 'usd',
      customer: customer.id,
      idempotency_key: uuidv4()
    }

    console.log('2nd')

   // console.log(payment)
     if(payment){
  
        const  newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid : userid,
          fromdate : fromdate,
          todate : todate,
          totalamount : totalamount,
          totaldays : totaldays,
          transactionId: '1234',
          token:token
        })
        const booking = await newbooking.save();
    
        const roomtemp = await Room.findOne({ _id: room._id });
    
        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate , todate:todate, userid: userid  , Payamount : totalamount,  details :token , status : booking.status});
        console.log(roomtemp)
        await roomtemp.save();
        //res.send("Room booked ")
      }
    res.send('Payment Successful , Your room is booked')
  }
  catch(error){
    console.log('uffff')
    return res.status(400).json({error})
  }
  
  // try {
  //  const  newbooking = new Booking({
  //     room: room.name,
  //     roomid: room._id,
  //     userid,
  //     fromdate ,
  //     todate,
  //     totalamount,
  //     totaldays,
  //     transactionId: '1234'
  //   })
  //   const booking = await newbooking.save();

  //   const roomtemp = await Room.findOne({ _id: room._id });

  //   roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate , todate:todate, userid: userid  , status : booking.status});
  //   console.log(roomtemp)
  //   await roomtemp.save();

  //   res.send("Room booked ")
   
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({ err});
  // }

  // if (!newbooking) {
  //   return res.status(500).json({ message: "Unexpected Error Occured" });
  // }

  // return res.status(201).json({ newbooking });
})

export default router;