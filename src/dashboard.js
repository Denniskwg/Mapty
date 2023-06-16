import { Container, Button, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './App.css';
import L from 'leaflet';


function Running(props) {
  return (
    <Row xs={12} md={6} className="workout" data-id={props.id} onClick={props.click} style={{borderLeft: props.type === 'running'?props.style.running:props.style.cycling}}>
      <div className="name">{props.name}</div>
      <p style={{'margin': '0'}}><b>{props.distance} km</b></p>
      <div className="div-3"><p style={{'margin': '0'}}><b>Calorie loss:</b></p><span className="calories">{props.calories} cal</span></div>
      {props.mode && <div className="div-3"><p><b>date: </b></p><span className="calories">{props.date}</span></div>}
      <button style={{backgroundColor: props.type === 'running' ? '#00c46a' :  '#ffb545', border: 'none'}}type="submit" className="btn btn-primary">start</button>
    </Row>
  );
};

function DashBoard (props) {

  function distance(lat1, lon1, lat2, lon2) {
	    // Convert coordinates from degrees to radians
    const toRadians = (angle) => angle * (Math.PI / 180);
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);
	  // Radius of the Earth (in kilometers)
    const radius = 6371;

	  // Apply Haversine formula
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;

    return distance.toFixed(2);
  }


  function calculateCalories(weight, speed, distance) {
    // Convert speed from km/h to m/s
    const speedInMetersPerSecond = speed / 3.6;
    // Calculate time in hours
    const timeInHours = distance / speedInMetersPerSecond;
    // Choose the appropriate MET value based on the activity (walking or running)
    const MET = speed <= 5 ? 3.5 : 7.0;
    // Calculate calorie loss
    const calories = weight * MET * timeInHours;
    // Return the result rounded to two decimal places
    return calories.toFixed(2);
  }

  function handleClickItem(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const item = props.workouts.find(item=>item.id === id);
    console.log(item);
    const start = item.coords_start;
    const end = item.coords_end;
    if (props.log) {
      props.setNewPosition([start, end]);
    }
  }

  function handleClickButton() {
    props.create(true);
    props.setPosition([]);
  }
  const style = {cycling: '5px solid #ffb545', running: '5px solid #00c46a'}
  const mode = JSON.parse(localStorage.getItem('user_mode'));
  return (
    <Container fluid className="dashboard">
    {mode ?<div style={{display: 'flex', flexDirection:'column', gap: '1rem'}}><button onClick={handleClickButton} className="btn btn-primary">Create New Route</button><h5>Your Routes</h5></div> : <p></p>}
    {props.workouts.length === 0 ? <div>No {props.option} routes</div> : (
      <ul className="routes list-group">
	{props.workouts.map((item, index) => {
	  return (
	  <li key={item.id} className="route-item"><Running date={item.date} mode={mode} name={item.name} click={props.click} id={item.id} distance={distance(item.coords_start[0], item.coords_start[1], item.coords_end[0], item.coords_end[1])} calories={calculateCalories(props.weight, props.speed, distance(item.coords_start[0], item.coords_start[1], item.coords_end[0], item.coords_end[1]))} style={style} type={item.type}/></li>
	  );
	})}
      </ul>
    )}
    </Container>
  );
};

export default DashBoard;
