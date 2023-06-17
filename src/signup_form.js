import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavBar} from './App';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col} from 'react-bootstrap';

function SignupForm(props) {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const {id, value} = e.target;
    setData(prevData=> ({
      ...prevData,
      [id]: value,
    }));
  }

  function submit(e) {
    e.preventDefault();
    if (validateInput()){
      signup();
    } else {
      alert('Please fill in all information');
    }
  }

  const signup = async ()=> {
    const response = await axios.post("https//mapty.denniswaruhiu.tech/v1/signup/", {
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: data.password,
    });
    console.log(response);
    navigate('/login');
  }

  function validateInput() {
    let check1 = true;
    Object.entries(data).forEach(([key, value]) => {
      if (!value) {
	check1 = false;
      }
    });
    return(check1);
  }

  return (
    <div className="custom-container">
      <NavBar/>
      <Container className="container form--1" xs={12} md={6}>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="first_name">Firstname</label>
          <input value={data.first_name} type="text" className="form-control" id="first_name" onChange={handleChange}/>
        </div>
	<div className="form-group">
	  <label htmlFor="last_name">Lastname</label>
	  <input value={data.last_name} type="text" className="form-control" id="last_name" onChange={handleChange}/>
	</div>
	<div className="form-group">
	  <label htmlFor="user_name">Username</label>
	  <input value={data.user_name} type="text" className="form-control" id="user_name" onChange={handleChange}/>
	</div>
	<div className="form-group">
	  <label htmlFor="email">Email</label>
	  <input value={data.email} type="text" className="form-control" id="email" onChange={handleChange}/>
	</div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value={data.password} type="text" className="form-control" id="password" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
      </Container>
    </div>
  );
};

export default SignupForm;
