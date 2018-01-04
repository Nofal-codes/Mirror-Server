'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('./api/models/model'); //created model loading here


//to convert to understable form when sending probably
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connecting to the database
mongoose.connect('mongodb://localhost/Tododb'); 
mongoose.Promise = global.Promise;

//routes
var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route

//listening to port
var port = process.env.PORT || 3000;
app.listen(port);
console.log('todo list RESTful API server started on: ' + port);

//providing backup for error 
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + '/ 404 not found'})
  });

