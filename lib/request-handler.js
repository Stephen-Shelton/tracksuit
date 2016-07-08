var app = require('../index');
var db = require('../app/config');
var Tracker = require('../app/model/track');

app.get('/', function(req, res) {
  res.redirect('index.html');
});

app.post('/api/toggleActivity', function(req, res) {
  if (req.body.start) {
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
    Tracker.findOne({'activities.category': req.body.category})
  }
});
