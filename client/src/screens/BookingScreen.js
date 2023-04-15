import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Moment from 'moment';

const BookingScreen = () => {
  const [loading, setloading] = useState(true);
  const [error,seterror] = useState();
  const [room, setroom] = useState();

  let {roomsid , fromdate , todate}  = useParams();
  const fd = Moment(fromdate , 'DD-MM-YYYY')
  const td = Moment(todate , 'DD-MM-YYYY')

  const totaldays = Moment.duration(td.diff(fd)).asDays()+1
  const [totalamount , settotalamount] = useState();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (await axios.post('http://localhost:5000/api/rooms/getallroomsbyid',  {roomsid : roomsid})).data

        setroom(data.room);
        settotalamount(data.room.rentperday*totaldays)
        //console.log(data.room);
        setloading(false)
        
      } catch (error) {
        seterror(true)
        console.log(error);
        setloading(false)
      }
    };
    fetchData();
  }, [roomsid]);


  async function bookRoom(){
    const bookingDetails = {
      room ,
      userid:JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    }

    try {
      const result = await axios.post('http://localhost:5000/api/booking/bookroom' , bookingDetails);
      console.log(result)
    } catch (error) {
      
    }
  }

  return (
    <div className="m-5">
      {loading ? (<Loader/>) : room ?  (<div>
        <div className="row justify-content-center mt-3 bs"> 
         <div className="col-md-6">
          <h1>{room.name}</h1>
          <img src={room.imageurls[0]} className="bigimg"  />
         </div>

         <div className="col-md-6">
          
            <div style={{textAlign:'right'}}>
            
                <h1>Booking Details</h1>
                <hr />
                <b>
                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                <p>From Date : {fromdate}</p>
                <p>To Date : {todate}</p>
                <p>Max Count : {room.maxcount}</p>
                </b>
            </div>

            <div style={{textAlign:'right'}}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days : {totaldays} </p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              
            </div>

            <div style={{float:'right'}}> 
              <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
            </div>
        
         </div>
        </div>


      </div>):(<Error/>) } 
    </div>
  );
}

export default BookingScreen;

