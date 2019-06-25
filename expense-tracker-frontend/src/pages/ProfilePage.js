import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

class ProfilePage extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleNewExpense = this.handleNewExpense.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			addName: '',
			addUserName: '',
			addDate: '',
			addCost: 0.0,
			addType: '',
			tableValues: [{
				Name: '',
				Cost: '',
				Date: ''
			}]
		}
	}

	addExpense(name, date, type, cost) {
		this.setState({addName: name, addType: type, addCost: cost, addDate: date, addUserName: this.props.location.state.name}, () => {
			alert('hello');
			fetch('http://localhost:9000/profile', {
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

	handleNewExpense() {
		let name = document.getElementById('expenseName').value;
		let date = document.getElementById('date').value;
		let type = document.getElementById('typeSelector').value;
		let cost = document.getElementById('cost').value;
		alert(name + ' ' + date + ' ' + type + ' ' + cost);
		this.addExpense(name, date, type, cost);
	}

	handleChange(e) {
		console.log(e.target.value);
	}

	/*
	callAPI(type) {
		fetch("http://localhost:9000/" + type)
        .then(res => res.json())
        .then((data) => {
          this.setState({ name: data });
          console.log(this.state.name);
        })
        .catch(() => {
          console.log();
        });
	}*/

	handleClick(e) {
		let activeId = e.target.id;
		//document.getElementById(activeId).className = "list-group-item active";
		e.target.className = "list-group-item active";
		for (let i = 0; i < 8; i++) {
			if (i != activeId) {
				document.getElementById(i).className = "list-group-item";
			}
		}

		let type = e.target.innerHTML;

		fetch("http://localhost:9000/expenses?name=" + this.props.location.state.name + "&type=" + type)
        .then(res => res.json())
        .then((data) => {
          //this.setState({ name: data });
          //console.log(this.state.name);
          this.setState({tableValues: data}, () => {
          	console.log(this.state.tableValues[0]);
          	this.rendertable(this.state.tableValues);
          });
          //console.log(data[0])
        })
        .catch(() => {
          console.log();
        });



		//alert(e.target.innerHTML + ' has been selected');

		//this.callAPI(e.target.innerHTML.toLowerCase());
	}

	rendertable(values) {

        if (this.state.tableValues.length == 0 || this.state.tableValues[0].Name == '') {
        	return (
        		<tr>
			        <td>N/A</td>
	   		        <td>N/A</td>
			        <td>N/A</td>
			        <td>N/A</td>
				</tr>
        	);
        }

        let len = this.state.tableValues.length;
        let index = 0;

        return this.state.tableValues.map((item, index) => {
	        index++;
	        return (
	            <tr>
	            	<th scope="row">{index}</th>
			        <td>{item.Name}</td>
	   		        <td>{item.Cost}</td>
			        <td>{item.Date}</td>
				</tr>
	        );
	    })

	}

	render() {
		return (
		    <div className="App">
		      <div className="jumbotron text-center profile-page table-dark">
		        <h1>{this.props.location.state.name}</h1>
		      </div>
		      <div className="row">
		      	<div className="col-sm-6">
			      	<button className="left" id="left"><span className="glyphicon glyphicon-triangle-left"></span></button>
			      	<label id="Month">June 2019</label>
			      	<button className="right" id="right"><span className="glyphicon glyphicon-triangle-right"></span></button>
		      	</div>
		      	<div className="col-sm-6 add-new">
		      	Add a new expense</div>
		      </div>
		      <div className="row">
		      	<div className="col-sm-6">
		      		<div className="list-group monthly">
					  <button id="0" onClick={this.handleClick} className="list-group-item">Food</button>
					  <button id="1" onClick={this.handleClick} className="list-group-item">Groceries</button>
					  <button id="2" onClick={this.handleClick} className="list-group-item">Rent</button>
					  <button id="3" onClick={this.handleClick} className="list-group-item">Household</button>
					  <button id="4" onClick={this.handleClick} className="list-group-item">Electronics</button>
					  <button id="5" onClick={this.handleClick} className="list-group-item">Travel/Commute</button>
					  <button id="6" onClick={this.handleClick} className="list-group-item">Stationery</button>
					  <button id="7" onClick={this.handleClick} className="list-group-item">Miscellaneous</button>
					</div>
		      	</div>
		      	<div className="row col-sm-6">
		      		<div className="typeselect">
		      			<input type="text" id="expenseName" className="form-control" placeholder="Expense name" />
		      		</div>
		      		<div className="typeselect">
			      		<div className="container">
			      			<input className="form-control" id="cost" type="number" placeholder="Cost" />
			      		</div>
		      		</div>
		      		<div className="typeselect">
		      			<div className="container">
		      				<input className="form-control" id="date" type="date" placeholder="Date" />
		      			</div>
		      		</div>
		      		<div className="typeselect ani">
						<select className="form-control selector" onChange={this.handleChange} id="typeSelector">
						  <option value="Food">Food</option>
						  <option value="Groceries">Groceries</option>
						  <option value="Rent">Rent</option>
						  <option value="Household">Household</option>
						  <option value="Electronics">Electronics</option>
						  <option value="Travel/Commute">Travel/Commute</option>
						  <option value="Stationery">Stationery</option>
						  <option value="Miscellaneous">Miscellaneous</option>
						</select>
					</div>
					<div className="container">
		      			<button type="submit" className="btn btn-dark" onClick={this.handleNewExpense}>Submit</button>
		      		</div>
		      	</div>
		      </div>
		      <div className="container category-view">
		      <table className="table">
				  <thead className="table-dark">
				    <tr>
				      <th scope="col">No.</th>
				      <th scope="col">Name</th>
				      <th scope="col">Cost</th>
				      <th scope="col">Date</th>
				    </tr>
				  </thead>
				  <tbody id="table-content">
				    {this.rendertable()}
				  </tbody>
				</table>
			  </div>
		    </div>
		 );
	}
}

export default ProfilePage;