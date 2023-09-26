import React, { useState, useEffect } from 'react';
import Map from './Map';
import DashBoard from './dashboard';
import {NavBar} from './App';


function UserView(props) {
  const [id, setId] = useState('');
  const [create, setCreate] = useState(false);
  const [position, setPosition] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [start, setStart] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await fetch(`http://127.0.0.1:8000/v1/user_workouts/${JSON.parse(id)}/`);
      const jsonData = await response.json();
      setWorkouts(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function handleClick(e) {
    const id = e.currentTarget.getAttribute('data-id');
    setId(id);
    setCreate(false);
    if (start) {
      setStart(false);
    }
    const item = workouts.find(item=>item.id === id);
    setName(item.name);
    setType(item.type);
    const startpos = item.coords_start;
    const endpos = item.coords_end;
    setPosition([startpos, endpos]);
  }

  const distance = async (lat1, lon1, lat2, lon2, type) => {
    const token = 'pk.eyJ1IjoiZGVubmlza3ciLCJhIjoiY2xoYnJiNjRqMDY3cDNtcDd5emQwdjY3ciJ9.UxYOlMmkZoYF3FzxiPSKoA';
    try {
      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${type === 'cycling' ? 'cycling' : 'walking'}/${lon1},${lat1};${lon2},${lat2}?annotations=distance&access_token=${token}`);
      const data = await response.json();
      // Extract the distance from the API response
      const distance = data.routes[0].distance;
      const distanceKms = distance / 1000;
      return distanceKms.toFixed(2);
      } catch (error) {
        console.error('Error:', error);
      }
  }

  const weight = JSON.parse(localStorage.getItem('weight'));
  const speed = JSON.parse(localStorage.getItem('speed'));

  return (
    <div className="custom-container">
      <NavBar/>
      <Map start={start} workouts={workouts} id={props.id} create={create} position={position} fetch={fetchData} name={name} distance={distance} type={type}/>
      <DashBoard setStart={setStart} workouts={workouts} click={handleClick} weight={weight} speed={speed} log={props.log} create={setCreate} setId={setId} setPosition={setPosition}/>

    </div>
  );
}

export default UserView;
