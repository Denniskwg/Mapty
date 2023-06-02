import './App.css';

function InputForm(props) {
  return (
    <div className="container form--1">
      <form onSubmit={props.submit}>
        <div className="form-group">
          <label htmlFor="weight">Current weight (kgs)</label>
          <input style={{'border': props.color.border}} value={props.weight} type="text" className="form-control" id="weight" onChange={props.handleWeight}/>
        </div>
        <div className="form-group">
          <label htmlFor="workout-type">workout type</label>
          <select className="form-select" aria-label="Select option" value={props.option} onChange={props.handleOption}>
          <option defaultValue value="cycling">cycling 🚴‍♀️</option>
	  <option value="running">running 🏃‍♂️</option>
	  </select>
        </div>
        <div className="form-group">
          <label htmlFor="speed">speed (km/h)</label>
          <input value={props.speed} type="text" className="form-control" id="speed"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;
