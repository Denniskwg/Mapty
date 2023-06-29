import { Container, Button, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './App.css';
import L from 'leaflet';


function Running(props) {
  function click() {
    props.setStart(true);
  }

  return (
    <Row xs={12} md={6} className="workout" data-id={props.id} onClick={props.click} style={{borderLeft: props.type === 'running'?props.style.running:props.style.cycling}}>
      <div className="name">{props.name}</div>
      <p style={{'margin': '0'}}><b>{props.distance} km</b></p>
      <div className="div-3"><p style={{'margin': '0'}}><b>Calorie loss:</b></p><span className="calories">{props.calories} cal</span></div>
      {props.mode && <div className="div-3"><p><b>date: </b></p><span className="calories">{props.date}</span></div>}
      <button onClick={click} style={{backgroundColor: props.type === 'running' ? '#00c46a' :  '#ffb545', border: 'none'}}type="submit" className="btn btn-primary">start</button>
    </Row>
  );
};


const distance = async (lat1, lon1, lat2, lon2, type) => {
	    const token = 'pk.eyJ1IjoiZGVubmlza3ciLCJhIjoiY2xoYnJiNjRqMDY3cDNtcDd5emQwdjY3ciJ9.UxYOlMmkZoYF3FzxiPSKoA';
	    try {
	      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${type === 'cycling' ? 'cycling' : 'walking'}/${lon1},${lat1};${lon2},${lat2}?annotations=distance&access_token=${token}`);
	      const data = await response.json();
	      // Extract the distance from the API response
	      const distance = data.routes[0].distance;
	      const distanceKms = distance / 1000;
	      console.log('Distance:', distance);
	      return distanceKms.toFixed(2);
	    } catch (error) {
              console.error('Error:', error);
	    }
}

function DashBoard (props) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(()=>{
    const calculateDistances = async () => {
      //wait for all data to be obtained from api and add it to the new workout object
      const newWorkouts = await Promise.all(
	props.workouts.map(async (item) => {
	  const dist = await distance(
	    item.coords_start[0],
	    item.coords_start[1],
	    item.coords_end[0],
	    item.coords_end[1],
	    item.type
	  );
	  item.distance = dist;
	  return item;
	})
      );
      setWorkouts(newWorkouts);
    };

    calculateDistances();
  }, [props.workouts]);

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
	{workouts.map((item, index) => {
	  return (
	  <li key={item.id} className="route-item list-group-item"><Running setStart={props.setStart} date={item.date} mode={mode} name={item.name} click={props.click} id={item.id} distance={item.distance} calories={calculateCalories(props.weight, props.speed, item.distance)} style={style} type={item.type}/></li>
	  );
	})}
      </ul>
    )}
    </Container>
  );
};

export default DashBoard;
