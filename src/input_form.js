import './App.css';
import { Container, Button, Row, Col} from 'react-bootstrap';

function InputForm(props) {
  return (
    <Container className="container form--1" xs={12} md={6}>
      <Row>
      <Col xs={12} md={3} className="image-col">
        <div className='image'></div>
	<div className="image-text">Track and map your workouts</div>
      </Col>
      <Col xs={12} md={6} className="form-col">
      <form onSubmit={props.submit}>
        <div className="form-group">
          <label htmlFor="weight">Current weight (kgs)</label>
          <input style={{'border': !props.weight ? props.color.border : '1px solid #dee2e6', 'outline': 'none'}} value={props.weight} type="text" className="form-control" id="weight" onChange={props.change}/>
        </div>
        <div className="form-group">
          <label htmlFor="type">workout type</label>
          <select id='type'style={{'outline': 'none'}}className="form-select" aria-label="Select option" value={props.option} onChange={props.change}>
          <option defaultValue value="cycling">cycling 🚴‍♀️</option>
	  <option value="running">running 🏃‍♂️</option>
	  </select>
        </div>
        <div className="form-group">
          <label htmlFor="speed">speed (km/h)</label>
          <input style={{'outline': 'none', 'border': !props.speed ? props.color.border : '1px solid #dee2e6'}} value={props.speed} type="text" className="form-control" id="speed" onChange={props.change}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </Col>
      </Row>
    </Container>
  );
};

export default InputForm;
