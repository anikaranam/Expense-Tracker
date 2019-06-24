var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('ok');
});

router.get('/profile', function(req,res,next) {
	console.log('hello')
	res.send('food is amazing');
});

//    POST REQUESTS    //

router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('ok');
});

router.post('/profile', function(req,res,next) {

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "ravi",
	  database: "ExpenseTracker"
	});

	con.connect();

	console.log(req.body["addName"])

	let name = req.body["addName"]
	let date = req.body["addDate"]
	let cost = req.body["addCost"]
	let type = req.body["addType"]

	con.query("INSERT INTO Expenses (UserID, Name, Date, Type, Cost) VALUES ('" + 1 + "', '"+ name + "', '" + date + "', '" + type + "', '" + cost + "')", function (err, result, fields) {
			if (err) throw err;
	    	res.send(result);	
		});

	console.log("hellloo");

	con.end();
});

module.exports = router;
