import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class SignUpPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			addName: '',
			addEmail: '',
			addPassword: ''
		}
	}

	addNewUser(name, email, password) {
		this.setState({addName: name, addEmail: email, addPassword: password}, () => {
			fetch('http://localhost:9000/signup', {
			    method: 'POST',
			    body: JSON.stringify(this.state),
			    headers: {
	    			'Content-Type': 'application/json',
	    			'accept':'application/json'
	  			}
		  	}).then(function(response) {
		    	console.log("Successful");
		  	}).catch(console.log("error"));
		});
	}

	handleCredentialCheck(response, name, email, pass1, pass2) {
		if (response == 'present') {
			alert('a user profile with the above credentials already exists. Please log in to continue');
			window.location.reload();
		} else {
			//alert('Profile successfully added');
			if (pass1 != pass2) {
				alert('Passwords do not match');
			} else if (pass1.length < 6) {
				alert('Password must be at least 8 characters long');
			} else {
				//alert(name + ' ' + email + ' ' + pass1 + ' ' + pass2);
				alert('Profile added!!');
				this.addNewUser(name, email, pass1);
				window.location = 'http://localhost:3000/';
			}
		}
	}

	validateCredentials(name, email, pass1, pass2) {
		fetch("http://localhost:9000/signup?name=" + name + "&email=" + email)
        .then(res => res.json())
        .then((data) => {
          //alert(data.name);
          this.handleCredentialCheck(data.result, name, email, pass1, pass2);
          //console.log(this.state.name);
        })
        .catch(() => {
          console.log();
        });
	}

	handleClick() {
		let name = document.getElementById('Name').value;
		let email = document.getElementById('Email').value;
		let pass1 = document.getElementById('pass1').value;
		let pass2 = document.getElementById('pass2').value;

		this.validateCredentials(name, email, pass1, pass2);
		
	}

	render() {
		return (
			<div>
				<div className="jumbotron text-center"><h1>Expense Tracker</h1></div>
				<div className="container form">
					<form id="signupform">
						<div>
							<input type="text" id="Name" className="form-control-lg col-sm-4" placeholder="Full name" />
						</div>
						<div>
					    	<input type="email" id="Email" className="form-control-lg col-sm-4" placeholder="Email" />
					    </div>
					    <div>
					    	<input type="password" id="pass1" className="form-control-lg col-sm-4" placeholder="Password" />
					    </div>
					    <div>
					    	<input type="password" id="pass2" className="form-control-lg col-sm-4" placeholder="Confirm Password" />
					    </div>
					</form>
				</div>
				<div className="container form">
				<button id="submitting" onClick={this.handleClick} className="btn btn-primary col-sm-1">Submit</button>
				</div>
			</div>
		)
	}
}

export default SignUpPage;