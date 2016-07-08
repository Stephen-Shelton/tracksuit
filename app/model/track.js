var db = require('../config');
var mongoose = require('mongoose');

var trackSchema = new mongoose.Schema({
  catagories: String,
  time: Date,
  state: String
});

var Track = mongoose.model('Tracker', trackSchema);


module.exports = Track;
