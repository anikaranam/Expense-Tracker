import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

/*
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
        <a href="ww.google.com" className="col-sm-12"><h4>If you don't have an account yet, click here to sign up</h4></a>
      </div>
    </div>
  );
}
*/

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/404' component={NotFoundPage} />
      <Route exact path='/profile' component={ProfilePage} />
      <Redirect to='/404' />
      </Switch>
    </Router>
  );
}

export default App;
