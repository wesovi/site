var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var compress = require('compression');
var pg = require("pg");
var config = require('./config');

var statusService = require('./routes/etc');
var usersRoute = require('./routes/users');


//mongoose.connect(config.db);

var app = express();

app.set('port', process.env.PORT || 5000);
app.use(compress());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var router = express.Router();

router.get("/api/v1/test/status",function(req,res,next){
	console.log('Retriving request from ');
	statusService.ping(req,res,next);
});

router.post('/api/v1/users',function(req,res,next){
	console.log('User creation service.');
	usersRoute.register(req,res,next);
});

app.use(router);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});