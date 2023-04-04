import React, { useEffect, useState} from 'react';
import axios from 'axios';

const HomeScreen = () => {
 
  const [rooms, setData] = useState([])

    const fetchData =  async () =>{
      try {
        const res = await axios.get('http://localhost:5000/rooms/');
        const data = await res.data;
        console.log(data)
        return data;
      } catch (error) {
        console.error(error.message);
      }
  
    }
    useEffect(() => {
    fetchData().then(data=>setData(data.rooms));
    }, []);

  return (
    <div>
    <h1> Home Screen </h1>
      <h1>they are {rooms.length} rooms</h1>
    </div>
  )
}

export default HomeScreen;