import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavBar} from './App';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col} from 'react-bootstrap';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('1px solid #dee2e6');
  const [id, setId] = useState('');


  function handleNameChange(event) {
    setUsername(event.target.value);
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  };

  function handleWeightChange(event) {
    props.setWeight(event.target.value);
  }
  function handleSpeedChange(event) {
    props.setSpeed(event.target.value);
  }

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (username && password && props.weight && props.speed) {
      login();
    } else {
      setColor('1px solid red');
    }
  }

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8000/v1/login/', {
        username,
	password,
      });
      console.log(response);
      const message = JSON.parse(response.data.message);
      if (!message) {
        alert('Wrong credentials');
      } else {
      props.logged(JSON.parse(response.data.message));
      props.setId(response.data.info.id);
      setId(response.data.info.id);
      localStorage.setItem('id', JSON.stringify(response.data.info.id));
      localStorage.setItem('weight', JSON.stringify(props.weight));
      localStorage.setItem('speed', JSON.stringify(props.speed));
      localStorage.setItem('user_mode', JSON.stringify(true));
      navigate(`/user-${response.data.info.id}`);
      }
    } catch (error){
      console.error(error);
    }
  };

  return (
    <div className="custom-container">
      <NavBar/>
      <Container className="container form--1" xs={12} md={6}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user_name">Username</label>
          <input style={{'border': !username ? color : '1px solid #dee2e6'}} value={username} type="text" className="form-control" id="user_name" onChange={handleNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input style={{'border': !password ? color : '1px solid #dee2e6'}} value={password} type="text" className="form-control" id="password" onChange={handlePasswordChange}/>
        </div>
	<div className="form-group">
	  <label htmlFor="weight">weight</label>
	  <input style={{'border': !props.weight ? color : '1px solid #dee2e6'}} value={props.weight} type="text" className="form-control" id="weight" onChange={handleWeightChange}/>
	</div>
	<div className="form-group">
	  <label htmlFor="speed">speed</label>
	  <input style={{'border': !props.speed ? color : '1px solid #dee2e6'}} value={props.speed} type="text" className="form-control" id="weight" onChange={handleSpeedChange}/>
	</div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      </Container>
    </div>
  );
};

export default LoginForm;
