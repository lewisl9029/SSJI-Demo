'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MongoSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Mongo', MongoSchema);