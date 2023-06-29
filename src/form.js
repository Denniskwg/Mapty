import React , { useState, useEffect } from 'react';
import InputForm from './input_form';
import { useNavigate } from 'react-router-dom';


function Form (props) {
  const [id, setId] = useState('');
  const [color, setColor] = useState({border: '1px solid #dee2e6'});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.weight && props.speed) {
      localStorage.setItem('type', JSON.stringify(props.option));
      localStorage.setItem('user_mode', JSON.stringify(false));
      navigate('/map');
    } else {
      setColor({border: '1px solid red'})
    }
  };


  function handleClick(event) {
    const elementId = event.currentTarget.getAttribute('data-id');
    setId(elementId);
  };

  return (
    <>
      <InputForm speed={props.speed} submit={handleSubmit} weight={props.weight}  option={props.option} color={color} change={props.change}/>
    </>
  );
};

export default Form;
