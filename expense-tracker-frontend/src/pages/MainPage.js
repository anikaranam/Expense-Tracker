import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { validateAll } from 'indicative';
import {pbkdf2Sync} from 'crypto';

class MainPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }

  sendData(sendName) {
    let path = '/profile';
      let state = {
          name: sendName
      }

      this.props.history.push(path, state);
  }

  getName() {

    let salt = '';
    let hash = pbkdf2Sync(this.state.password, salt, 1000, 64, `sha512`).toString(`hex`);

    let sendEmail = this.state.email;

    alert(sendEmail + ' ' + hash);
    fetch("http://localhost:9000/profile?email=" + sendEmail + "&hashed_password=" + hash)
        .then(res => res.json())
        .then((data) => {
          if (data.val != 'missing' && data.val != 'wrongpass') {
            console.log('appropriate profile found. redirecting you to profile page');
            this.sendData(data.val);
          }
        })
        .catch(() => {
          console.log();
        });
      
  }

  handleClick(e) {
    //alert("signed in!");

    let path = '/profile';
    let state = {
      email: this.state.email,
      password: this.state.password
    }

    const rules = {
      email: 'required|email',
      password: 'required|min:6|max:30'
    }

    const data = this.state;

    validateAll(data, rules)
      .then(() => {
        console.log('Email and password validation complete. Checking for appropriate profile');

        this.getName();
        //this.props.history.push(path, state);
        //alert(this.state.email + ' ' + this.state.password);
      })
      .catch((errors) => {
        console.log(errors);
        let error = errors[0].message;
        if (error.includes("email")) {
          alert('Please enter a valid Email ID');
        } else if (error.includes("min")) {
          alert('Password should be at least 6 characters long');
        } else if (error.includes("max")) {
          alert('Password should not be more than 30 characters long');
        }
      })

      e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit() {
    //e.preventDefault();
  }

  render() {
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
                <label><h4>Email address:</h4></label>
                <input type="email" onChange = {this.handleChange} className="form-control" id="email" placeholder="xyz@gmail.com"/>
              </div>
              <div className="form-group text-left">
                <label><h4>Password:</h4></label>
                <input type="password" onChange = {this.handleChange} className="form-control" id="password" placeholder="*******"/>
              </div>
              <button id="submitButton" type="submit" onClick={this.handleClick} className="btn btn-success">Sign in</button>
            </form>
          </div>
        </div>
        <hr />
        <div className="row">
          <Link to='/signup' className="col-sm-12"><h4>If you don't have an account yet, click here to sign up</h4></Link>
        </div>
      </div>
    );
  }
  
}

export default MainPage;