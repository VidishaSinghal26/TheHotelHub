import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter , Route , Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
          <Routes>
              <Route  path ="/home" exact element={<HomeScreen/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
