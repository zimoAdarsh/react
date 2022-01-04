
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/login/Login'
import Signup from './component/signup/Signup'
import Home from './component/home/home';
import Event from './component/event/Event'
import Trip from './component/trips/Trip';
function App() {
  return (
    <div className="App">
  
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/event' element={<Event />}></Route>
          <Route path='/trip' element= { <Trip/> }>  </Route>

        </Routes>





    </div>
  );
}

export default App;
