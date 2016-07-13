//var app = require('../index');
var db = require('../app/config');
var Tracker = require('../app/model/track');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('index.html');
  });

  app.post('/api/all', function(req, res) {
    console.log('REQ BODY: ', req.body)
    Tracker.find({userID: req.body.userID}, function(err, tracks) {
      respObj = []
      tracks.forEach(function(object){
        object.activities.forEach(function(activity){
          inputObj = {
            category: '',
            activity: '',
            time: []
          };
          inputObj.category = object.category;
          inputObj.activity = activity.name;
          function calculateTime(timeArray){
            if(timeArray.length % 2 === 0){
              for(var i = 0; i<timeArray.length; i+=2){
                inputObj.time.push([timeArray[i], timeArray[i +1]])
              }
            } else {
              for(var i = 0; i<timeArray.length-1; i+=2){
                inputObj.time.push([timeArray[i], timeArray[i +1]])
              }
            }
          }
          calculateTime(activity.time)
          respObj.push(inputObj);
        })
      })
      res.send(200, respObj);
    })
  })

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
                activity: req.body.activity,
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

  app.post('/api/goals', function(req, res) {
    console.log(req.body.userID)
    if (!req.body) {
      return res.sendStatus(404);
    }
    var goal = {
      userID: req.body.userID,
      goalCategory: req.body.goalCategory,
      goalActivityName: req.body.goalActivityName,
      goalTime: req.body.goalTime
    }
    res.status(201).send(JSON.stringify(goal));
  })

  app.get('/api/goals', function(req, res) {
    return res.sendStatus(200);
  })
}
