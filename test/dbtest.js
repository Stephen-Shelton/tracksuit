var chai = require('chai');
var expect = chai.expect;
var should = chai.should();


var db = require('../app/config');
var Track = require('../app/model/track');
var mongoose = require('mongoose');


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
      var u = new Track({
        catagories: 'sleep',
        time: new Date(),
        state: 'start'
      });
      u.save(done);
    });

    it('shold save different entries', function(done) {
      var u = new Track({
        catagories: 'sleep',
        time: new Date(),
        state: 'stop'
      });
      var u1 = new Track({
        catagories: 'food',
        time: new Date(),
        state: 'start'
      });
      var u2 = new Track({
        catagories: 'sport',
        time: new Date(),
        state: 'start'
      });
      u.save();
      u1.save();
      u2.save();
      done();
    })

    it('respond with matching records', function() {
      return Track.find({catagories: 'sleep'}, function(err, tracks) {
        tracks.length.should.equal(2);
      });
    });

    it('should find all records', function() {
      return Track.find({}, function(err, tracks) {
        tracks.length.should.equal(4);
      });
    });
  });


});