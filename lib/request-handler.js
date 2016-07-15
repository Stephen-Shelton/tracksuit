//var app = require('../index');
var db = require('../app/config');
var Tracker = require('../app/model/track');
var Goal = require('../app/model/goal');

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
              for(var i = 0; i < timeArray.length; i += 2){
                inputObj.time.push([timeArray[i], timeArray[i + 1]]);
              }
            } else {
              for(var i = 0; i<timeArray.length-1; i+=2){
                inputObj.time.push([timeArray[i], timeArray[i + 1]]);
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

    Tracker.findOne({'category': req.body.category}, function(err, track) {
      if (err) {
        console.error("find category error: ", err);
      } else if (track === null) {
        var doc = {};
        doc.category = req.body.category;
        doc.activities = [{
          name: req.body.activity,
          time: [req.body.time]
        }];
        new Tracker(doc).save(function(err) {
          if (err) {
            console.error("server save db add category error: ", err);
          } else {
            res.sendStatus(200);
          }
        });
      } else {
        var found = false;
        track.activities.forEach(function(activity) {
          if (activity.name === req.body.activity) {
            if (activity.time.length % 2 === 1) {
              if (req.body.time - activity.time[activity.time.length - 1] < 60000) {
                activity.time.pop();
              } else {
                activity.time.push(req.body.time);
              }
            } else {
              activity.time.push(req.body.time);
            }
            found = true;
          }
        });
        if (!found) {
          track.activities.push({
            name: req.body.activity,
            time: [req.body.time]
          });
        }
        track.save(function(err) {
          if (err) {
            console.error("server save db add activity error: ", err);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
    
  });

  app.post('/api/goals', function(req, res) {
    console.log(req.body.userID);
    if (!req.body) {
      return res.sendStatus(404);
    }
    var goal = req.body;
    Goal.findOne({category: req.body.category, activity: req.body.activity}, function(err, doc) {
      if (err) {
        console.error('Error when finding a document: ' + err);
      } else if (doc === null) {
        var dbObj = new Goal(goal);
        dbObj.save(function(err) {
          if (err) {
            console.error('Error when saving new document: ' + err);
          } else {
            res.status(201).send(JSON.stringify(goal));
          }
        });
      } else {
        doc.save(function(err) {
          if (err) {
            console.error('Error when updating document: ' + err);
          } else {
            res.status(200).send(JSON.stringify(goal));
          }
        });
      }
    });
  });

  app.get('/api/goals', function(req, res) {
    // expects user id to be sent in headers as x-userid. should be changed once
    // users can be logged in.
    Goal.find({userID: req.headers['x-userid']}, function(err, docs) {
      if (err) {
        return res.status(400).send('Error retrieving goals: ' + err);
      }
      var goals = [];
      docs.forEach(function(obj) {
        goals.push(obj);
      });
      res.status(200).send(JSON.stringify(goals))
    });
  });
}
