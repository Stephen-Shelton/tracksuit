var mongoose = require('mongoose');

var mongodbUri = 'mongodb://gabe:mks40@ds021994.mlab.com:21994/tracksuit';//'mongodb://gabe:0814@ds021994.mlab.com:21994/tracksuit-test';          
mongoose.connect(mongodbUri); //'mongodb://localhost/db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db start');
});

module.exports = db;
