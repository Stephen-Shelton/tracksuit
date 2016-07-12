//var app = require('../index');
var db = require('../app/config');
var Tracker = require('../app/model/track');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('index.html');
  });

  app.post('/api/toggleActivity', function(req, res) {
    console.log('SERVER: in server post handler');
    
    Tracker.findOne({'category': req.body.category, 'activities.name': req.body.activity}, function(err, track) {
      if (err) {
        console.error('Stop time error: ', err);
      } else if(track === null) {
        var dbObj = new Tracker({
          userID: '001',
          category: req.body.category,
          activities: [{
            name: req.body.activity,
            time: [req.body.time]
          }]
        });
        dbObj.save(function(err) {
          if (err) { console.error("Start time error: ", err); } 
          else { res.send(200); } 
        });
      } else {
        var activities = track.activities;
        activities[0].time.push(req.body.time);
        track.save(function(err) {
          if (err) {
            console.error("Start time error: ", err);
          } else {
            if(activities[0].time.length % 2 === 0){
              var array = activities[0].time
              var time1 = array[array.length -1]
              var time2 = array[array.length -2]
              var duration = time1 - time2;
              console.log('duration: ', duration)
              var respObj = {
                category: req.body.category,
                duration: duration
              }
              res.send(200, respObj) 
            } else{
              res.send(200);
            }
          }
        });
      }
    });
  });
}

          
