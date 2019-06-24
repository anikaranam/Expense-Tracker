import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="App">
      <div className="jumbotron text-center">
        <h1>Expense Tracker</h1>
      </div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4 ani">
          <form>
            <div className="form-group text-left">
              <label for="email"><h4>Email address:</h4></label>
              <input type="email" className="form-control" id="email" placeholder="xyz@gmail.com"/>
            </div>
            <div className="form-group text-left">
              <label for="pwd"><h4>Password:</h4></label>
              <input type="password" className="form-control" id="pwd" placeholder="*******"/>
            </div>
            <button id="submitButton" type="submit" className="btn btn-success">Sign in</button>
          </form>
        </div>
      </div>
      <hr />
      <div className="row">
        <a href="/profile" className="col-sm-12"><h4>If you don't have an account yet, click here to sign up</h4></a>
      </div>
    </div>
  );
}

export default MainPage;