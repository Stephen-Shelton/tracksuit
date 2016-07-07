var expect = require('chai').expect;
var should = require('should');



var db = require('../app/config');
var Track = require('../app/model/track');


describe('create track entry', function () {


  describe('#create()', function () {
    it('should create a new track', function (done) {
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
  });


});