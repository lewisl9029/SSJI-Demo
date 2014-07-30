'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SafenodeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Safenode', SafenodeSchema);