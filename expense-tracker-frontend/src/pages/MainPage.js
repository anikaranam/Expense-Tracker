import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { validateAll } from 'indicative';

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

  handleClick() {
    //alert("signed in!");
    alert(this.state.email + ' ' + this.state.password);

    const rules = {
      email: 'required|email',
      password: 'required|min:6|max:30'
    }

    const data = this.state;

    validateAll(data, rules)
      .then(() => {
        console.log('validated');
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
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit() {

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
                <label for="email"><h4>Email address:</h4></label>
                <input type="email" onChange = {this.handleChange} className="form-control" id="email" placeholder="xyz@gmail.com"/>
              </div>
              <div className="form-group text-left">
                <label for="pwd"><h4>Password:</h4></label>
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