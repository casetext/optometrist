
'use strict';

var optometrist = require('../../index');

var schema = {
  temperature: {
    description: 'Set the temperature of the system.',
    required: true
  },
  incrementRadius: {
    description: 'Increment the radius of the blower.',
    default: true
  },
  scissors: {
    description: 'How many pairs do you need?',
    default: 'sixty-one'
  },
  brainSaladSurgery: {
    description: 'Reverse the polarity of the neutron flow.'
  },
  pruneWithGloves: {
    description: 'May prevent a rash if working on clematis plants.',
    default: true
  }
};

describe('Optometrist', function() {

  describe('#get', function() {

    before(function() {
      optometrist.get.__argv = [ 'test', '--brain-salad-surgery=woffle', '--increment-radius=false' ];
      optometrist.get.__env = { 'TEMPERATURE': 8, 'SCISSORS': 'eleventy' };
    });

    it('retrieves the settings from the right places into an object', function() {
      var settings = optometrist.get(schema);

      // test default settings
      expect(settings.pruneWithGloves).to.equal(true);

      // test grabbing settings from env
      expect(settings.temperature).to.equal(8);

      // test overriding settings from env
      expect(settings.scissors).to.equal('eleventy');

      // test override of default with argv
      expect(settings.incrementRadius).to.equal(false);

      // test grabbing settings from argv
      expect(settings.brainSaladSurgery).to.equal('woffle');
    });

  });

  describe('#usage', function() {

    it('returns a string containing usage instructions for the CLI', function() {
      var usage = optometrist.usage('test', 'A test description.', schema);

      expect(usage).to.be.a('string');
      expect(usage).to.contain(schema.temperature.description);
      expect(usage).to.contain(schema.incrementRadius.description);
      expect(usage).to.contain(schema.scissors.description);
      expect(usage).to.contain(schema.brainSaladSurgery.description);
      expect(usage).to.contain(schema.pruneWithGloves.description);

    });

  });

  describe('#merge', function() {

    it('merges multiple objects into the first object', function() {

      var dstObj = { foo: 'bar', bar: 'baz' };
      var srcObj = { foo: undefined, quux: 3 };
      var src2Obj = { quux: 4, bells: 'whistles' };

      expect(optometrist.merge(dstObj, srcObj, src2Obj))
      .to.deep.equal({
        foo: undefined,
        bar: 'baz',
        quux: 4,
        bells: 'whistles'
      });

    });

  });

});
