function LoginForm(props) {
  return (
    <div className="container form--1">
      <form>
        <div className="form-group">
          <label htmlFor="user_name">Username</label>
          <input value='' type="text" className="form-control" id="user_name"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value='' type="text" className="form-control" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
