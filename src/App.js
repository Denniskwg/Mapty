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
import Demo from './demo';
import UserView from './userview';


function NavBar (props) {

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light .navbar-expand{-sm|-md|-lg|-xl}">
      <div style={{ fontSize: "1.8rem", marginLeft: "0.5rem", letterSpacing: "0.1rem" }} className='nav-name'>
	  <Link style={{textDecoration: 'none', color: 'black'}} to={'/'}><p>mapty</p></Link>
      </div>
      <Button style={{ marginRight: "0.5rem"}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </Button>
      <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: "0.5rem"}}>
	<ul className='nav-list navbar-nav ml-auto'>
	  <li className='nav-item active'><Link to={'/login'}>Login</Link></li>
	  <li className='nav-item'><Link to={'/signup'}>Signup</Link></li>
	</ul>
      </div>
    </Navbar>
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
