import React, { useEffect, useState} from 'react';
import axios from 'axios';

const HomeScreen = () => {
 
  const [rooms, setData] = useState([])

  useEffect(() => {
    const fetchData =  async () =>{
      try {
        const {data: response} = await axios.get('api/rooms/getallrooms');
        setData(response);
        
      } catch (error) {
        console.error(error.message);
      }
  
    }

    fetchData();
  }, []);

  return (
    <div>
    <h1> Home Screen </h1>
      <h1>they are {rooms.length} rooms</h1>
    </div>
  )
}

export default HomeScreen;