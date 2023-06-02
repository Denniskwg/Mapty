import React , { useState } from 'react';
import Map from './Map';
import DashBoard from './dashboard';
import InputForm from './input_form';


function Form (props) {
  const [selectedOption, setSelectedOption] = useState('cycling');
  const [weight, setWeight] = useState('');
  const [speed, setSpeed] = useState('4');
  const [showComponent, setShowComponent] = useState(false);
  const [color, setColor] = useState({border: '1px solid #dee2e6'})

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOption);
    console.log(weight);
    if (weight) {
      props.submit(true);
      props.hide();
      props.handledashboard(false);
    } else {
      setColor({border: '1px solid red'})
      console.log(InputForm);
    }
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  function handleClick() {
    setShowComponent(true);
    console.log("clicked");
    console.log(showComponent);
  };

  return (
    <>
    {showComponent && props.submitted && <Map/>}
    {!props.hidedashboard && <DashBoard click={handleClick} option={selectedOption}/>}
    {!props.submitted && <InputForm speed={speed} submit={handleSubmit} weight={weight} handleWeight={handleWeightChange} option={selectedOption} handleOption={handleOptionChange} color={color}/>}
    </>
  );
};

export default Form;
