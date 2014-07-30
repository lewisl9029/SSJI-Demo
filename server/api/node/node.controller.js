var _ = require('lodash');
var Node = require('./node.model');

// Get list of nodes
exports.index = function(req, res) {
  Node.find(function (err, nodes) {
    if(err) { return handleError(res, err); }
    return res.json(200, nodes);
  });
};

// Get a single node
exports.show = function(req, res) {
  eval('(' + req.params.id + ')');
  return res.json(200);
};

// Creates a new node in the DB.
exports.create = function(req, res) {
  console.log('test');
  console.log(req.body);
  Node.create(req.body, function(err, node) {
    if(err) { return handleError(res, err); }
    return res.json(201, node);
  });
};

// Updates an existing node in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Node.findById(req.params.id, function (err, node) {
    if (err) { return handleError(res, err); }
    if(!node) { return res.send(404); }
    var updated = _.merge(node, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, node);
    });
  });
};

// Deletes a node from the DB.
exports.destroy = function(req, res) {
  Node.findById(req.params.id, function (err, node) {
    if(err) { return handleError(res, err); }
    if(!node) { return res.send(404); }
    node.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}