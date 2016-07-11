var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();


var db = require('../app/config');
var Track = require('../app/model/track');
var mongoose = require('mongoose');
var app = require('../index');


describe('create track entry', function () {

  before(function() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
  });

  describe('#create()', function () {
    xit('should create a new track', function (done) {
      // Create a User object to pass to User.create()
      var u = {
        activities: [JSON.stringify({1:1,2:2}), JSON.stringify({2:2,3:3})],
        dummy: 'dummy'
      };
      Track.create(u, function (err, createdTrack) {
        // Confirm that that an error does not exist
        should.not.exist(err);
        // verify that the returned user is what we expect
        JSON.parse(createdTrack.activities[0])[1].should.equal(1);
        createdTrack.dummy.should.equal('dummy');
        // Call done to tell mocha that we are done with this test
        done();
      });
    });

    it('should save without error', function(done) {
      var u1 = new Track({
        userID: '001',
        category: 'sleep',
        activities: [{
          name: 'sleep1',
          time: [{
            start: new Date(),
            stop: new Date()+100
          }]
        }]
      });
      var u2 = new Track({
        userID: '002',
        category: 'sleep',
        activities: [{
          name: 'sleep2',
          time: [{
            start: new Date(),
            stop: new Date()+100
          }]
        }]
      });
      var u3 = new Track({
        userID: '001',
        category: 'exercise',
        activities: [{
          name: 'sleep1',
          time: [{
            start: new Date(),
            stop: new Date()+100
          }]
        }]
      });

      u3.save();
      u2.save();
      u1.save();
      done();
    });

    xit('shold save different entries', function(done) {
      var u = new Track({
        category: 'sleep',
        time: new Date(),
        state: 'stop'
      });
      var u1 = new Track({
        category: 'food',
        time: new Date(),
        state: 'start'
      });
      var u2 = new Track({
        category: 'sport',
        time: new Date(),
        state: 'start'
      });
      u.save();
      u1.save();
      u2.save();
      done();
    })

    it('should add activities', function() {
      return Track.findOne({userID: '001', category: 'sleep'}, function(err, tracks) {
        tracks.activities.push({
          name: 'sleep3',
          time: [{
            start: new Date(),
            stop: new Date()+100
          }]
        });
        tracks.save();
      });
    })

    it('respond with matching records', function(done) {
      return Track.findOne({userID: '001', category: 'sleep', 'activities.name': 'sleep1'}, function(err, tracks) {
        // tracks.time.push({
        //   start: new Date()+300,
        //   stop: new Date()+400
        // });
        tracks.activities[0].time.push({
          start: new Date()+300,
          stop: new Date()+400
        });
        tracks.save();
        tracks.length.should.equal(1);
      });
    });

    xit('should find all records', function() {
      return Track.find({}, function(err, tracks) {
        tracks.length.should.equal(4);
      });
    });

    xit('should find the lasted record of a certain category', function() {
      return Track.findOne({category: 'sleep'}, {}, {sort: { 'time' : -1 }}, function(err, track) {
        return track.state.should.equal('stop');
      });
    });

    xdescribe('server test', function() {
      it('should accept http post request', function(done) {
        request(app)
          .post('/api/toggleActivity')
          .send({
            category: 'sleep',
            time: new Date(),
            state: 'start'
          })
          .expect(200)
          .end(done);
      });
    })

  });


});