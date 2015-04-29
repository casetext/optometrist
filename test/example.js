
'use strict';

var optometrist = require('../index');
var schema = {
  foo: {
    required: true,
    description: 'Reverse the polarity of the neutron flow.'
  },
  bar: {
    description: 'Invalidate the cache and check for off-by-one errors.',
    default: true
  }
};
var settings;

try {
  settings = optometrist.getConfig('default', schema);
  console.log('You set foo to', settings.foo, 'and bar to', settings.bar);
} catch(e) {
  console.error(optometrist.getUsage('sonic-screwdriver', 'Opens doors.'));
  console.error('Error:', e.message);
  process.exit(1);
}
