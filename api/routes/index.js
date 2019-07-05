var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
require('dotenv').config();
var jsonexport = require('jsonexport');
var fs = require('fs');
const nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('ok');
});

//    POST REQUESTS    //

router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('ok');
});


//    CHECKING FOR EXISTING PROFILE   //
router.get('/profile', function(req, res, next) {

	console.log(process.env.REACT_APP_MYSQL_PASSWORD + ' is password');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: process.env.REACT_APP_MYSQL_PASSWORD,
	  database: "Hello"
	});

	con.connect();

	let email = req.query["email"];
	let password = req.query["hashed_password"];

	console.log(email);

	let found = false;
	let wrong_password = false;

	console.log('getting right profile');
	let profile = {};

	con.query("SELECT Email, Password, Name FROM Profiles", function (err, result, fields) {
			if (err) throw err;
			let i = 0;
			for (i = 0; i < result.length; i++) {
				if (result[i]["Email"].toLowerCase() == email.toLowerCase()) {
					profile = result[i];
				}
			}

			let obj = {
				val: ''
			}

			if (!profile["Email"]) {
				//console.log('oops');
				obj.val = 'missing';
			} else if (profile["Password"] != password) {
				obj.val = 'wrongpass';
			} else {
				obj.val = profile["Name"];
				console.log(obj.val);
			}

			res.send(obj);

		});

	con.end();
});


//    ADDING A NEW EXPENSE    //
router.post('/profile', function(req,res,next) {

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: process.env.REACT_APP_MYSQL_PASSWORD,
	  database: "Hello"
	});

	con.connect();

	console.log(req.body["addName"])

	let name = req.body["addName"]
	let date = req.body["addDate"]
	let cost = req.body["addCost"]
	let type = req.body["addType"]
	let username = req.body["addUserName"];
	console.log(username + ' is username');
	console.log(name + ' is name');

	con.query("INSERT INTO Expenses (UserName, Name, Date, Type, Cost) VALUES ('" + username + "', '"+ name + "', '" + date + "', '" + type + "', '" + cost + "')", function (err, result, fields) {
			if (err) throw err;
	    	res.send(result);	
		});

	console.log("hellloo");

	con.end();
});



//     VALIDATING CREDENTIALS    //
router.get('/signup', function(req, res, next) {
	let name = req.query["name"];
	let email = req.query["email"];

	console.log(name + ' ' + email);

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: process.env.REACT_APP_MYSQL_PASSWORD,
	  database: "Hello"
	});

	con.connect();
	let present = false;

	con.query("SELECT Name, Email FROM Profiles", function (err, result, fields) {
			if (err) throw err;
			for (let i = 0; i < result.length; i++) {
				if (result[i]["Name"] == name) {
					present = true;
					//res.send('name');
				} else if (result[i]["Email"] == email) {
					present = true;
					//res.send('email');
				}
			}
			if (present == true) {
				let obj = {
					result: 'present'
				}
				res.send(obj);
			} else {
				let obj = {
					result: 'added'
				}
				res.send(obj);
			}
		});
	

	con.end();
});

//    LISTING MONTHLY EXPENSES FOR A USER    //
router.get('/expenses', function(req, res, next) {

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: process.env.REACT_APP_MYSQL_PASSWORD,
	  database: "Hello"
	});

	con.connect();

	let name = req.query["name"];
	let type = req.query["type"];
	let month = req.query["month"];
	let year = req.query["year"];
	

	console.log(name + ' ' + type);

	con.query("SELECT Name, Date, Cost FROM Expenses WHERE Username = '" + name + "' AND Type = '" + type + "'", function (err, result, fields) {
			if (err) throw err;
	    	res.send(result);	
		});

	con.end();

});

/**		Downloading CSV File 	**/
router.post('/list', function(req,res,next) {
	//res.send('ok');

	let name = req.query["name"];

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: process.env.REACT_APP_MYSQL_PASSWORD,
	  database: "Hello"
	});

	con.connect();

	con.query("SELECT Name, Date, Type, Cost FROM Expenses WHERE Username = '" + name + "'", function (err, result, fields) {
			if (err) throw err;
 
			jsonexport(result,function(err, csv){
			    if(err) return console.log(err);
			    console.log(csv);
			    //res.send(csv);

			    fs.writeFile('DownloadedCSV.csv', csv, function (err) {
				  if (err) throw err;
				  console.log('Saved!');
				});

				const transporter = nodemailer.createTransport({ // Use an app specific password here
				  service: 'Gmail',
				  auth: {
				    user: 'email@gmail.com',
				    pass: 'password'
				  }
				});

				const options = {
				    from: 'email@gmail.com',
				    to: 'test@gmail.com',
				    subject: 'Test',
				    text: 'Hello World'
				};

				transporter.sendMail(options, (error, info) =>{
				    if(error) {
				        //...
				        console.log(error);
				    } else {
				        //...
				        console.log('successful');
				    }
				});


			});

	    	res.send('File downloaded successfully!');	
		});

	con.end();

});


//     ADDING A NEW USER    //
router.post('/signup', function(req,res,next) {

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: process.env.REACT_APP_MYSQL_PASSWORD,
	  database: "Hello"
	});
	
	con.connect();

	console.log(req.body["addName"])

	let name = req.body["addName"]
	let email = req.body["addEmail"]
	let password = req.body["addPassword"]

	//let salt = crypto.randomBytes(16).toString('hex');
	let salt = '';
	let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

	con.query("INSERT INTO Profiles (Name, Email, Password) VALUES ('" + name + "', '" + email + "', '" + hash + "')", function (err, result, fields) {
			if (err) throw err;
	    	res.send(result);	
		});

	con.end();
});

module.exports = router;
