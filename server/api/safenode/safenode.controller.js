'use strict';

var _ = require('lodash');
var Safenode = require('./safenode.model');

// Get list of safenodes
exports.index = function(req, res) {
  Safenode.find(function (err, safenodes) {
    if(err) { return handleError(res, err); }
    return res.json(200, safenodes);
  });
};

// Get a single safenode
exports.show = function(req, res) {
  JSON.parse(req.params.id);
  return res.json(200);
};

// Creates a new safenode in the DB.
exports.create = function(req, res) {
  Safenode.create(req.body, function(err, safenode) {
    if(err) { return handleError(res, err); }
    return res.json(201, safenode);
  });
};

// Updates an existing safenode in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Safenode.findById(req.params.id, function (err, safenode) {
    if (err) { return handleError(res, err); }
    if(!safenode) { return res.send(404); }
    var updated = _.merge(safenode, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, safenode);
    });
  });
};

// Deletes a safenode from the DB.
exports.destroy = function(req, res) {
  Safenode.findById(req.params.id, function (err, safenode) {
    if(err) { return handleError(res, err); }
    if(!safenode) { return res.send(404); }
    safenode.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}