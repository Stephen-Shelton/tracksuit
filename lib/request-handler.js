//var app = require('../index');
var db = require('../app/config');
var Tracker = require('../app/model/track');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('index.html');
  });

  app.post('/api/toggleActivity', function(req, res) {
    console.log('SERVER: in server post handler');
    if (req.body.state === 'start') {
      // do start stuff
      var record = new Tracker(req.body);
      record.save(function(err) {
        if (err) {
          console.error("Start time error: ", err);
        } else {
          res.send(200);
        }
      });
    } else {
      // do stop stuff
      Tracker.findOne({category: req.body.category}, {}, {sort: { 'time' : -1 }}, function(err, track) {
        if (err) {
          console.error('Stop time error: ', err);
        } else {
          var duration = req.body.time - track.time;
          var record = new Tracker(req.body);
          record.save(function(err) {
            if (err) {
              console.error("Stop time save error: ", error);
            } else {
              console.log('duration: ', duration);
              res.status(200).send({category: req.body.category, duration: duration});
            }
          })
        }
      });
    }
  });
};
