import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import DashBoard from './dashboard';
import { Container, Button, Overlay, Popover, Nav, Navbar, Row} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Form from './form';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import Map from './Map';
import UserMap from './loggedMap';
import Demo from './demo';
import UserView from './userview';


function NavBar (props) {
  return (
    <div>
    <Navbar expand="lg" className="nav-bar navbar-expand-lg navbar-light">
      <div onClick={props.showForm} style={{ fontSize: "1.8rem", marginLeft: "0.5rem", letterSpacing: "0.1rem" }} className='nav-name'>
	  <Link style={{textDecoration: 'none', color: 'black'}} to={'/'}><p>mapty</p></Link>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <div style={{'marginLeft': 'auto', 'marginRight': '1rem'}}>
	  <ul className='nav-list'>
	    <li><Link to={'/login'}>Login</Link></li>
	    <li><Link to={'/signup'}>Signup</Link></li>
	  </ul>
	</div>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState({});
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [newPosition, setNewPosition] = useState([]);
  const [demoWorkouts, setDemoWorkouts] = useState([]);
  const [data, setData] = useState({
    type: 'cycling',
    weight: '',
    speed: 8,
  });
  
  const [weight, setWeight] = useState('');
  const [speed, setSpeed] = useState(8);

  function handleChange(e) {
    const { id, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }


  const pathId = JSON.parse(localStorage.getItem('id'));

  return (
      <BrowserRouter>
        <Routes>
	  <Route path="/" element={<Home data={data} change={handleChange}/>} />
	  <Route path="/login" element={<LoginForm logged={setLoggedIn} setId={setId} weight={weight} setWeight={setWeight} speed={speed} setSpeed={setSpeed}/>} />
	  <Route path="/signup" element={<SignupForm/>} />
	  <Route path="/map" element={<Demo workouts={demoWorkouts} weight={data.weight} speed={data.speed}/>} />
	  <Route path={`/user-${pathId}`} element={<UserView workouts={userWorkouts} speed={speed} log={loggedIn} weight={weight} id={id}/>} />
        </Routes>
      </BrowserRouter>
  );
};

function Home(props) {
  return (
    <div className="custom-container">
      <NavBar/>
      <Form weight={props.data.weight} speed={props.data.speed} option={props.data.type} change={props.change} fetch={props.fetch}/>
    </div>
  );
}

export {App, NavBar};
