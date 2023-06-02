import { Container, Button, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './App.css';

function Cycling(props) {
  return (
    <Row xs={12} md={6} className="workout workout--cycling" data-id="1234567891" onClick={props.click}>
      <div className="name">Upper hill road</div>
      <p style={{'margin': '0'}}><b>27 km</b></p>
      <div className="div-3"><p style={{'margin': '0'}}>Calorie loss:</p><span className="calories">490 cal</span></div>
    </Row>
  );
};

function Running(props) {
  return (
    <Row xs={12} md={6} className="workout workout--running" data-id="1234567891" onClick={props.click}>
      <div className="name">Upper hill road</div>
      <p style={{'margin': '0'}}><b>27 km</b></p>
      <div className="div-3"><p style={{'margin': '0'}}>Calorie loss:</p><span className="calories">490 cal</span></div>
    </Row>
  );
};

function DashBoard (props) {
  return (
    <Container fluid className="dashboard">
      <ul className="routes list-group">
        <li className="route-item">{props.option === 'cycling' ? <Cycling click={props.click}/> : <Running click={props.click}/>}</li>
      </ul>
    </Container>
  );
};

export default DashBoard;
