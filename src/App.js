import './App.css';
import DashBoard from './dashboard';
import { Container, Button, Overlay, Popover, Nav, Navbar, Row} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Form from './form';
import LoginForm from './login_form';
import SignupForm from './signup_form';

function Typography () {
  return (
    <Container className="typography">
      <div className="images">
        <div className='image1'></div>
        <div className='image3'></div>
      </div>
    </Container>
  );
};

function NavBar (props) {
  return (
    <Navbar expand="lg" className="nav-bar navbar-expand-lg navbar-light">
      <div onClick={props.showForm} style={{ fontSize: "1.8rem", marginLeft: "0.5rem", letterSpacing: "0.1rem" }} className='nav-name'>
	  <p>mapty</p>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <div style={{'marginLeft': 'auto', 'marginRight': '1rem'}}>
	  <ul className='nav-list'>
	    <li onClick={props.loginclick}>Login</li>
	    <li onClick={props.signupclick}>Signup</li>
	  </ul>
	</div>
      </Navbar.Collapse>
    </Navbar>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [hide, setHide] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hideDashboard, setHideDashboard] = useState(true);

  function handleLoginClick() {
    setShowLogin(true);
    setShowSignup(false);
    setHide(true);
  };

  function handleSignupClick () {
    setShowSignup(true);
    setShowLogin(false);
    setHide(true);
  };

  function showForm() {
    setShowLogin(false);
    setShowSignup(false);
    setHide(false);
    setHideDashboard(true);
    setSubmitted(false);
  };

  function hideTypography() {
    setHide(true);
  };


  return (
    <div className="custom-container">
      <NavBar loginclick={handleLoginClick} signupclick={handleSignupClick} showForm={showForm}/>
      {showLogin && <LoginForm/>}
      {!showLogin && !showSignup && <Form hide={hideTypography} submit={setSubmitted} submitted={submitted} hidedashboard={hideDashboard} handledashboard={setHideDashboard}/>}
      {showSignup && <SignupForm/>}
    </div>
  );
};

export default App;
