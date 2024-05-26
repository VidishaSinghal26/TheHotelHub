import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import 'antd/dist/reset.css';
import { DatePicker, Space, message } from 'antd';

const { RangePicker } = DatePicker;

const HomeScreen = () => {

  const [rooms, setData] = useState([])
  const [loading, setloading] = useState();
  const [error, seterror] = useState()

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey , setsearchkey] = useState('');
  const [ type , settype ] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (await axios.get("https://the-hotel-hub-theta.vercel.app/api/rooms/getallrooms")).data

        setData(data.rooms)
        setduplicaterooms(data.rooms)
        setloading(false)

      } catch (error) {
        seterror(true)
        console.log(error);
        setloading(false)
      }
    };
    fetchData();
  }, []);


  
function filterByDate(dates) {
    setfromdate(dates[0].format('DD-MM-YYYY'));
    settodate(dates[1].format('DD-MM-YYYY'));
    console.log(dates[0].format('DD-MM-YYYY'));
    console.log(dates[1].format('DD-MM-YYYY'));

    var temprooms = [];
    var availability;
    for (const room of duplicaterooms) {
      //  console.log(room);
        availability = true; 
        if (room.currentbookings.length > 0) {
            for (const booking of room.currentbookings) {

                if (
                  isDateBetween(dates[0].format('DD-MM-YYYY'), booking.fromdate, booking.todate ) || 
                  isDateBetween(dates[1].format('DD-MM-YYYY'), booking.fromdate, booking.todate ) 
                    // moment(booking.fromdate).isBetween(dates[0], dates[1]) ||
                    // moment(booking.todate).isBetween(dates[0], dates[1])
                ) {
                   availability = false;
                }
            }
        }
        if (availability) {
            temprooms.push(room);
        }
    }
    setData(temprooms);
}

function isDateBetween(dateToCheck, fromDate, toDate) {
  return fromDate <= dateToCheck && dateToCheck <= toDate;
}

  function filterBySearch(){
    const temprooms = duplicaterooms.filter(rooms => rooms.name.toLowerCase().includes(searchkey.toLowerCase()))
    setData(temprooms)
  }

  function filterByType(e){
    settype(e)
    if(e!== 'all'){
      const temprooms = duplicaterooms.filter(rooms => rooms.type.toLowerCase() === e.toLowerCase())
      setData(temprooms)
    }
    else{
      setData(duplicaterooms)
    }
    
  }

  return (
    <div className='landing1 m-0' >
      <div className='row bs m-0 ' >
        <div className='col-md-3'>
          <RangePicker format={'DD-MM-YYYY'} onChange={filterByDate} />
        </div>

        <div className='col-md-6'>
          <input type="text" className='form-control' placeholder='search rooms' style={{marginTop:'1px'}}
            value ={searchkey} onChange={(e) => setsearchkey(e.target.value)} onKeyUp={filterBySearch}
          />
          
        </div>

        <div className='col-md-3'  >
          <select className='form-control' value={type} style={{marginTop:'1px'}} onChange={(e) => {filterByType(e.target.value)}}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>

        </div>
      </div>


      <div className='row justify-content-center mt-3'>
        {loading ? (<Loader />) : (rooms.map((rooms) => {
          return <div className='col-md-9 mt-2'>
            <Room rooms={rooms} fromdate={fromdate} todate={todate} />
          </div>
        })
        ) }
      </div>
    </div>
  );
}

export default HomeScreen;
