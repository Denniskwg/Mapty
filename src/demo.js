import React, { useState, useEffect } from 'react';
import Map from './Map';
import DashBoard from './dashboard';
import {NavBar} from './App';


function Demo(props) {
  const [id, setId] = useState('');
  const [position, setPosition] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [start, setStart] = useState(false);
  const [name, setName] = useState('');

  useEffect(()=>{
    fetchDemoData();
  }, []);

  const type = JSON.parse(localStorage.getItem('type'));

  function handleClick(e) {
    const id = e.currentTarget.getAttribute('data-id');
    setId(id);
    if (start) {
      setStart(false);
    }
    const item = workouts.find(item=>item.id === id);
    setName(item.name);
    const startpos = item.coords_start;
    const endpos = item.coords_end;
    setPosition([startpos, endpos]);
  }

  const fetchDemoData = async () => {
    try {
      const response = await fetch(`https://api.denniswaruhiu.tech/v1/demo_workouts/${type}/`);
      const jsonData = await response.json();
      setWorkouts(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  return (
    <div className="custom-container">
      <NavBar/>
      <Map workouts={workouts} id={id} position={position} start={start} name={name} type={type} distance={distance}/>
      <DashBoard workouts={workouts} click={handleClick} weight={props.weight} speed={props.speed} setStart={setStart}/>
    </div>
  );
};


export default Demo;
