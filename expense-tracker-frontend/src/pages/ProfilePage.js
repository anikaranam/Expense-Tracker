import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

class ProfilePage extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleNewExpense = this.handleNewExpense.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleNewExpense() {
		let name = document.getElementById('expenseName').value;
		let date = document.getElementById('date').value;
		alert(name + ' ' + date);
	}

	handleChange(e) {
		console.log(e.target.value);
	}

	render() {
		return (
		    <div className="App">
		      <div className="jumbotron text-center profile-page">
		        <h1>Anirudh Karanam</h1>
		      </div>
		      <div className="row">
		      	<div className="col-sm-6">
			      	<button className="btn btn-signin left glyphicon glyphicon-alert" id="left">Left</button>
			      	<label id="Month">June 2019</label>
			      	<button className="btn btn-signin right" id="right">Right</button>
		      	</div>
		      	<div className="col-sm-6 add-new">
		      	Add a new expense</div>
		      </div>
		      <div className="row">
		      	<div className="col-sm-6">
		      		<div className="list-group monthly">
					  <a href="#" className="list-group-item">Food</a>
					  <a href="#" className="list-group-item">Groceries</a>
					  <a href="#" className="list-group-item">Rent</a>
					</div>
		      	</div>
		      	<div className="row col-sm-6">
		      		<div className="typeselect">
		      			<input type="text" id="expenseName" className="form-control" placeholder="Expense name" />
		      		</div>
		      		<div className="typeselect">
		      			<input className="form-control" id="date" type="date" placeholder="Date" />
		      		</div>
		      		<div className="typeselect">
						<select className="form-control" onChange={this.handleChange}>
						  <option value="Food">Food</option>
						  <option value="Groceries">Groceries</option>
						  <option value="Rent">Rent</option>
						  <option value="Household expenses">Household expenses</option>
						  <option value="Electronics">Electronics</option>
						  <option value="Travel/Commute">Travel/Commute</option>
						  <option value="Stationery">Stationery</option>
						  <option value="Miscellaneous">Miscellaneous</option>
						</select>
					</div>
					<div className="container">
		      			<button type="submit" className="btn btn-primary" onClick={this.handleNewExpense}>Submit</button>
		      		</div>
		      	</div>
		      </div>
		      <div className="container">
		      <table className="table" style={{overflow: "scroll"}}>
				  <thead className="thead-light">
				    <tr>
				      <th scope="col">No.</th>
				      <th scope="col">Name</th>
				      <th scope="col">Date</th>
				      <th scope="col">Type of Expense</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <th scope="row">1</th>
				      <td>Ahmed Bazaar</td>
				      <td>21/06/2019</td>
				      <td>Groceries</td>
				    </tr>
				    <tr>
				      <th scope="row">2</th>
				      <td>Auto to Tuition</td>
				      <td>20/06/2019</td>
				      <td>Travel/Commute</td>
				    </tr>
				    <tr>
				      <th scope="row">3</th>
				      <td>Starbucks</td>
				      <td>19/06/2019</td>
				      <td>Food</td>
				    </tr>
				  </tbody>
				</table>
			  </div>
		    </div>
		 );
	}
}

export default ProfilePage;