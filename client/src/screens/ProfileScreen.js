import React , {useEffect , useState} from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import { Divider, Space, Tag } from 'antd';
import Error from "../components/Error";
import Swal from 'sweetalert2';

// const { TabPane } = Tabs;

function ProfileScreen() {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(()=>{
        if(!user){
            window.location.href= "/login";
        }
    })
    return (
        <div className="landing2" style={{margin:'0px'}}>
           <Tabs defaultActiveKey='1' className='ml-3 mt-3'>
            <Tabs.TabPane tab="Profile" key="1" className='bs '>
             <h1>My Profile</h1>

             <br />
             <h1>Name : {user.name}</h1>
             <h1>Email : {user.email}</h1>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Bookings" key="2" >
             <MyBookings />
            </Tabs.TabPane>
           </Tabs>
        </div>
    )
}

export default ProfileScreen



export function MyBookings(){

   const user = JSON.parse(localStorage.getItem('currentUser'));
   const [bookings, setbookings] = useState([])
   const [loading, setloading] = useState(false );
   const [error, seterror] = useState();
   console.log(user._id);
   //const rooms;
    useEffect(() => {
        const fetchData = async () => {
          try {
            setloading(true)
            const rooms = await (await axios.post('http://localhost:5000/api/booking/getbookingsbyuserid', {userid : user._id})).data;
            //const rooms = (await axios.post("http://localhost:5000/api/booking/getbookingsbyuserid" , {userid : user._id})).data;
            console.log(rooms);
            setbookings(rooms);
            setloading(false)
    
          } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error)
          }
        };
        fetchData();
      }, []);

      async function cancelBooking(bookingid , roomid){
        try{
          setloading(true)
          const result = await (await axios.post('http://localhost:5000/api/booking/cancelbooking' , {bookingid , roomid})).data
          console.log(result);
          setloading(false )
          Swal.fire('Congrats' , 'Your booking has been cancelled' , 'success').then(result=>{
            window.location.reload();
          })
        }
        catch(error){
          console.log(error);
          setloading(false)
          Swal.fire('oops' , 'Something went wrong' , 'error')
        }
      }

    return (
        <div className='landing1'>
            <div className='row'>
             <div className='col-md-6'>
              {loading && (<Loader/>)}
              {bookings && (bookings.map(booking =>{
                return <div className='bs ' style={{marginTop:'5px'}}>
                  <h1>{booking.room}</h1>
                  <p><b>Booking Id</b> :{booking._id}</p>
                  <p><b>Check In</b> : {booking.fromdate}</p>
                  <p><b>Cheack Out</b> : {booking.todate}</p>
                  <p><b>Amount</b> : {booking.totalamount}</p>
                  <p><b>Status</b> : {booking.status === 'cancelled' ? <Tag color="red">CANCELLED</Tag> : <Tag color="green">CONFIRMED</Tag>}</p>

                  {booking.status !== 'cancelled' && (<div className='text-right'>
                    <button className='btn btn-primary' onClick={() => {cancelBooking(booking._id , booking.roomid)}}>Cancel Booking</button>
                  </div>)}
                </div>
              }))}
             </div>

            </div>
        </div>
    )
}