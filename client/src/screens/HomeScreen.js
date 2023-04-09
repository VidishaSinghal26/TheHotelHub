import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

const HomeScreen = () => {
 
  const [rooms, setData] = useState([])
  const [loading, setloading] = useState();
  const [error,seterror] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data

        setData(data.rooms)
        //console.log(data);
        setloading(false)
        
      } catch (error) {
        seterror(true)
        console.log(error);
        setloading(false)
      }
    };
    fetchData();
  }, []);

    // const fetchData =  async () =>{
    //   try {
    //     setloading(true)
    //     const res = await axios.get('http://localhost:5000/api/rooms/getallrooms');
    //     const data = await res.data;
    //     console.log(data)
    //     setloading(false)
    //     return data;
        
    //   } catch (error) {
    //     seterror(true)
    //     console.error(error.message);
    //     setloading(false)
    //   }
  
    // }
    // useEffect(() => {
    // fetchData().then(data=>setData(data.rooms));
    // }, []);

  return (
    <div className='container'>
        <div className='row justify-content-center mt-5'>
            {loading ? (<Loader/>) : rooms.length >1 ?  (rooms.map((rooms) =>{
            return <div className='col-md-9 mt-2'>
                  <Room rooms={rooms} />
                  </div>
          })
          ):(<Error/>)  }
        </div>
    </div>
  );
}

export default HomeScreen;