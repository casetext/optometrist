
'use strict';

var optometrist = require('../index');
var schema = {
  foo: {
    required: true,
    description: 'Reverses the polarity of the neutron flow.'
  },
  bar: {
    description: 'Invalidates the cache and checks for off-by-one errors.',
    default: true
  }
};
var settings;

try {
  settings = optometrist.get(schema);
  console.log('You set foo to', settings.foo, 'and bar to', settings.bar);
} catch(e) {
  console.error(optometrist.usage('App', 'A way cool app to do stuff!', schema));
  console.error('Error:', e.message);
  process.exit(1);
}
