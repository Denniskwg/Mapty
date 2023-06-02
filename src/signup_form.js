function SignupForm(props) {
  return (
    <div className="container form--1">
      <form>
        <div className="form-group">
          <label htmlFor="first_name">Firstname</label>
          <input value='' type="text" className="form-control" id="first_name"/>
        </div>
	<div className="form-group">
	  <label htmlFor="last_name">Lastname</label>
	  <input value='' type="text" className="form-control" id="last_name"/>
	</div>
	<div className="form-group">
	  <label htmlFor="user_name">Username</label>
	  <input value='' type="text" className="form-control" id="user_name"/>
	</div>
	<div className="form-group">
	  <label htmlFor="email">Email</label>
	  <input value='' type="text" className="form-control" id="email"/>
	</div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value='' type="text" className="form-control" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
