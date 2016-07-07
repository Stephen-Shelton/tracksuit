var db = require('../config');
var mongoose = require('mongoose');

var trackSchema = new mongoose.Schema({
  activities: [String],
  dummy: String
});

var Track = mongoose.model('Tracker', trackSchema);


module.exports = Track;