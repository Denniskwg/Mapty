import React, { useState, useEffect } from 'react';
import Map from './Map';
import DashBoard from './dashboard';
import {NavBar} from './App';


function Demo(props) {
  const [id, setId] = useState('');
  const [position, setPosition] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(()=>{
    fetchDemoData();
  }, []);

  const type = JSON.parse(localStorage.getItem('type'));

  function handleClick(e) {
    const id = e.currentTarget.getAttribute('data-id');
    setId(id);
    const item = workouts.find(item=>item.id === id);
    const start = item.coords_start;
    const end = item.coords_end;
    setPosition([start, end]);
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

  return (
    <div className="custom-container">
      <NavBar/>
      <Map workouts={workouts} id={id} position={position}/>
      <DashBoard workouts={workouts} click={handleClick} weight={props.weight} speed={props.speed}/>
    </div>
  );
};


export default Demo;
