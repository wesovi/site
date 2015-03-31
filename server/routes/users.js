/**
 * New node file
 */
var pg = require("pg");
var config = require('./../config');

exports.register = function(req,res,next){
	var data = {text: req.body.text, complete: false};
	var client = new pg.Client(config.connectionString);
	client.connect(function(err) {
		if(err) {
			console.error('could not connect to postgres', err);
	    }
		client.query("INSERT INTO users(username,password,creationDate) VALUES ($1,$2,$3), RETURNING ",[data.username,data.password,new Date()], function(err, result) {
			if(err) {
				console.error('error running query', err);
		    }
			console.log(result.rows[0].theTime);
	        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
			res.json(row);
	        client.end();
		});
	});
	
	res.status('201');
	next();
}