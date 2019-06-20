import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="jumbotron text-center">
        <h1>Expense Tracker</h1>
      </div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4 ani">
          <form>
            <div className="form-group">
              <label for="email"><h4>Email address:</h4></label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label for="pwd"><h4>Password:</h4></label>
              <input type="password" className="form-control" id="pwd" />
            </div>
            <button id="submitButton" type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
      <hr />
      <div className="row">
        <a href="ww.google.com" className="col-sm-12"><h4>If you don't have an account yet, click here to sign up</h4></a>
      </div>
    </div>
  );
}

export default App;
