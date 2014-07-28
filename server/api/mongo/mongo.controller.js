'use strict';

var _ = require('lodash');
var Mongo = require('./mongo.model');

// Get list of mongos
exports.index = function(req, res) {
  Mongo.find(function (err, mongos) {
    if(err) { return handleError(res, err); }
    return res.json(200, mongos);
  });
};

// Get a single mongo
exports.show = function(req, res) {
  Mongo.findById(req.params.id, function (err, mongo) {
    if(err) { return handleError(res, err); }
    if(!mongo) { return res.send(404); }
    return res.json(mongo);
  });
};

// Creates a new mongo in the DB.
exports.create = function(req, res) {
  Mongo.create(req.body, function(err, mongo) {
    if(err) { return handleError(res, err); }
    return res.json(201, mongo);
  });
};

// Updates an existing mongo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mongo.findById(req.params.id, function (err, mongo) {
    if (err) { return handleError(res, err); }
    if(!mongo) { return res.send(404); }
    var updated = _.merge(mongo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mongo);
    });
  });
};

// Deletes a mongo from the DB.
exports.destroy = function(req, res) {
  Mongo.findById(req.params.id, function (err, mongo) {
    if(err) { return handleError(res, err); }
    if(!mongo) { return res.send(404); }
    mongo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}