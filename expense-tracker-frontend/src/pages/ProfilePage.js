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
		this.changeMonth = this.changeMonth.bind(this)
		this.downloadCSV = this.downloadCSV.bind(this)
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

	/** 	click handler for download button 	**/
	downloadCSV() {
		//alert(document.getElementById('headertitle').innerHTML);
		fetch('http://localhost:9000/list?name=' + document.getElementById('headertitle').innerHTML, {
			    method: 'POST',
			    body: JSON.stringify(this.state),
			    headers: {
	    			'Content-Type': 'application/json',
	    			'accept':'application/json'
	  			}
		  	}).then(function(response) {
		    	console.log("Successful");
		    	alert('File download successful');
		  	}).catch(console.log("error"));
	}

	addExpense(name, date, type, cost) {
		this.setState({addName: name, addType: type, addCost: cost, addDate: date, addUserName: this.props.location.state.name}, () => {
			//alert('hello');
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

	changeMonth(event) {

		let months = ["January","February","March",
                 "April","May","June","July","August",
                 "September","October","November","December"];
		let val = document.getElementById('Month').innerHTML;
		let current_month = val.split(" ")[0];
		let current_year = val.split(" ")[1];
		//alert(current_month);

		if (event.target.id == 'left') {
			let currentIndex = months.indexOf(current_month);
			let newIndex = 0;
			let newYear = 0;
			if (currentIndex == 0) {
				newIndex = 11;
				newYear = parseInt(current_year) - 1;
				document.getElementById('Month').innerHTML = months[newIndex] + " " + newYear;
			} else {
				newIndex = currentIndex - 1;
				document.getElementById('Month').innerHTML = months[newIndex] + " " + current_year;
			}
		}

		if (event.target.id == 'right') {
			let currentIndex = months.indexOf(current_month);
			let newIndex = 0;
			let newYear = 0;
			if (currentIndex == 11) {
				newIndex = 0;
				newYear = parseInt(current_year) + 1;
				document.getElementById('Month').innerHTML = months[newIndex] + " " + newYear;
			} else {
				newIndex = currentIndex + 1;
				document.getElementById('Month').innerHTML = months[newIndex] + " " + current_year;
			}	
		}
	}

	handleNewExpense() {
		let name = document.getElementById('expenseName').value;
		let date = document.getElementById('date').value;
		let type = document.getElementById('typeSelector').value;
		let cost = document.getElementById('cost').value;
		alert(name + ' ' + date + ' ' + type + ' ' + cost);
		if (name == '') {
			alert('Please enter Expense name');
		} else if (type == '') {
			alert('Please enter Expense type');
		} else if (date == '') {
			alert('Please enter Expense date');
		} else if (cost == '') {
			alert('Please enter Expense cost');
		} else {
			this.addExpense(name, date, type, cost);
		}
		
	}

	findMonth() {
		let months = ["January","February","March",
                 "April","May","June","July","August",
                 "September","October","November","December"];
		var d = new Date();
		return (months[d.getMonth()] + " " + d.getFullYear());
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
		let date = document.getElementById('Month').innerHTML;
		let current_month = date.split(" ")[0];
		let current_year = date.split(" ")[1];

		//alert(current_month + " " + current_year);

		fetch("http://localhost:9000/expenses?name=" + this.props.location.state.name + "&type=" + type + "&month=" + current_month + "&year=" + current_year)
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
		    	<div className="page-header text-center">
		          <h1 id="headertitle">{this.props.location.state.name}</h1>
		          <button id="getSummary" onClick={this.downloadCSV} data-toggle="tooltip" data-placement="top" title="Download Expense file as CSV" className="sub ui-btn-inline"><span className="glyphicon glyphicon-download-alt"></span></button>
		          <button id="sendFile" onClick={this.sendEmail} data-toggle="tooltip" data-placement="top" title="Share via Email" className="send ui-btn-inline"><span className="glyphicon glyphicon-envelope"></span></button>
		        </div>


		      <div className="row">
		      	<div className="col-sm-6">
			      	<button className="left" onClick={this.changeMonth} id="left"><span className="glyphicon glyphicon-triangle-left"></span></button>
			      	<label id="Month">{this.findMonth()}</label>
			      	<button className="right" onClick={this.changeMonth} id="right"><span className="glyphicon glyphicon-triangle-right"></span></button>
		      	</div>
		      	<div className="col-sm-6 add-new" id="Month">
		      	Add a new expense</div>
		      </div>



		      <div className="row">
		      	<div className="col-sm-6">
		      		<div className="list-group monthly">
					  <button id="0" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Food Expenses" className="list-group-item">Food</button>
					  <button id="1" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Grocery Expenses" className="list-group-item">Groceries</button>
					  <button id="2" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Rent Expenses" className="list-group-item">Rent</button>
					  <button id="3" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Household Expenses" className="list-group-item">Household</button>
					  <button id="4" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Electronics Expenses" className="list-group-item">Electronics</button>
					  <button id="5" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Travel/Commute Expenses" className="list-group-item">Travel/Commute</button>
					  <button id="6" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Stationery Expenses" className="list-group-item">Stationery</button>
					  <button id="7" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="View all Miscellaneous Expenses" className="list-group-item">Miscellaneous</button>
					</div>
		      	</div>
		      	<div className="row col-sm-6">
		      		<div className="col">
		      			<input type="text" id="expenseName" placeholder="Expense name" />
		      		</div>
			      	<div className="col">
			      		<input id="cost" type="number" placeholder="Cost" />
			  		</div>
		      		<div className="col">
		      			<input id="date" type="date" placeholder="Date" />
		      		</div>

		      		<div className="container">
						<select className="selector" onChange={this.handleChange} id="typeSelector">
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
		      			<button type="submit" id="submitnewexpense" onClick={this.handleNewExpense}>Submit</button>
		      		</div>

		      	</div>

		      </div>
		      <div className="container category-view">
		      <table className="table">
				  <thead>
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