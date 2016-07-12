var db = require('../config');
var mongoose = require('mongoose');


var activitySchema = new mongoose.Schema({
  name: String,
  time: [Date]
});

var trackSchema = new mongoose.Schema({
  userID: String,
  category: String,
  activities: [activitySchema]
});

var Track = mongoose.model('Tracker', trackSchema);


module.exports = Track;
