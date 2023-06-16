import './App.css';
import { Container, Button, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm(props) {
  
  return (
    <Container className="form--2" xs={12} md={12}>
      <button onClick={()=>props.setShowForm(false)} style={{background:'none', fontSize: '1.5rem', border: 'none', margin: '0', float: 'right', color: 'red', fontWeight: 'bold'}}>x</button>
      <Col xs={12} md={12}>
      <form onSubmit={props.submit}>
        <div className="form-group">
          <label htmlFor="route_name">Route Name</label>
          <input value={props.data.name} type="text" className="form-control" id="name" onChange={props.change}/>
        </div>
	<div className="form-group">
	  <label htmlFor="weight">Current weight (kgs)</label>
	  <input value={props.data.weight} type="text" className="form-control" id="weight" onChange={props.change}/>
	</div>
        <div className="form-group">
          <label htmlFor="workout-type">workout type</label>
          <select style={{'outline': 'none'}}className="form-select" aria-label="Select option" value={props.data.type} onChange={props.change} id="type">
          <option defaultValue value="cycling">cycling 🚴‍♀️</option>
	  <option value="running">running 🏃‍♂️</option>
	  </select>
        </div>
        <div className="form-group">
          <label htmlFor="speed">speed (km/h)</label>
          <input value={props.data.speed} type="text" className="form-control" id="speed" onChange={props.change}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </Col>
    </Container>
  );
};

export default UserForm;
