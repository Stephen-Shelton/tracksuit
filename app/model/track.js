var db = require('../config');
var mongoose = require('mongoose');

var timeSchema = new mongoose.Schema({
  start: Date,
  stop: Date
});

var activitySchema = new mongoose.Schema({
  name: String,
  time: [timeSchema]
});

var trackSchema = new mongoose.Schema({
  userID: String,
  category: String,
  activities: [activitySchema]
});

var Track = mongoose.model('Tracker', trackSchema);


module.exports = Track;
