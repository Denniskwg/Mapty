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

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = localStorage.getItem('id');
      console.log(id);
      const response = await fetch(`https://api.denniswaruhiu.tech/v1/user_workouts/${JSON.parse(id)}/`);
      const jsonData = await response.json();
      setWorkouts(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function handleClick(e) {
    const id = e.currentTarget.getAttribute('data-id');
    console.log(id);
    setId(id);
    setCreate(false);
    if (start) {
      setStart(false);
    }
    const item = workouts.find(item=>item.id === id);
    const startpos = item.coords_start;
    const endpos = item.coords_end;
    setPosition([startpos, endpos]);
  }

  const weight = JSON.parse(localStorage.getItem('weight'));
  const speed = JSON.parse(localStorage.getItem('speed'));

  return (
    <div className="custom-container">
      <NavBar/>
      <Map start={start} workouts={workouts} id={props.id} create={create} position={position}/>
      <DashBoard setStart={setStart} workouts={workouts} click={handleClick} weight={weight} speed={speed} log={props.log} create={setCreate} setId={setId} setPosition={setPosition}/>
    </div>
  );
}

export default UserView;
