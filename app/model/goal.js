var db = require('../config');
var mongoose = require('mongoose');

var goalSchema = new mongoose.Schema({
  userID: String,
  category: String,
  activity: String,
  time: Number
});

var Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
