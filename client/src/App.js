import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter , Route , Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
          <Routes>
              <Route  path ="/home" exact element={<HomeScreen/>} />
              <Route path="/book/:roomsid" element={<BookingScreen />}/>
              <Route  path ="/register" exact element= {<RegisterScreen/>} />
              <Route  path ="/login" exact element= {<LoginScreen/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
