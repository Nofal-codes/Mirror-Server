'use strict';

//intiating connecting //needs perfomance review if implemnted correctly
var connection = require('mongoose');
var tank = connection.model('MYTasks' , 'mytasks' );  //name of model, collection


//list of ways to respond
exports.list_all_tasks = (req, res) => {
  var query = {};
  tank.find(query, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = function(req, res) {
  var new_task = new tank(req.body); //???
  console.log(req.body);
  console.log(new_task);
  new_task.save( function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  tank.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  tank.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  tank.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};