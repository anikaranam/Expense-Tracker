import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import wallet from '../Wallet.png'

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
				<div className="page-header text-center">
		         	<h1>Expense Tracker</h1>
		        </div>
				<div className="row logo">
					<div className="col-sm-4">
	          		</div>
					<form className="col-sm-4 text-center" id="formlogin">
						<div className="container">
							<input type="text" id="Name" className="logindetails" placeholder="Full name" />
						</div>
						<div className="container signup">
					    	<input type="email" id="Email" className="logindetails" placeholder="Email" />
					    </div>
					    <div className="container signup">
					    	<input type="password" id="pass1" className="logindetails" placeholder="Password" />
					    </div>
					    <div className="container signup">
					    	<input type="password" id="pass2" className="logindetails" placeholder="Confirm Password" />
					    </div>
					</form>
					<div className="container">
							<button id="submitting" onClick={this.handleClick}>Add Account</button>
						</div>	
				</div>
				
			</div>
		)
	}
}

export default SignUpPage;