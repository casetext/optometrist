
'use strict';

var argize = require('./argize'),
  envize = require('./envize'),
  camelize = require('./camelize'),
  dejsonize = require('./dejsonize'),
  usage = require('./usage');

global.__optometrist = global.__optometrist || { schemas: {}, configs: {} };

/**
 * getConfig parses configuration options from arguments and the environment given a schema.
 * @param {Object} schema The schema object that describes what to get.
 * @returns {Object} The configuration as gathered from arguments to the process and the environment.
 * @throws {Error} if a required configuration option is missing.
 */
module.exports = function getConfig(name, schema) {

  if (global.__optometrist.configs[name]) {
    return global.__optometrist.configs[name];
  }

  // register this schema, as many modules may provide one, for purposes of usage.
  global.__optometrist.schemas[name] = schema;

  var args = Array.prototype.slice.call(arguments, 0),
    argv = process.__testArgv || process.argv.slice(2),
    env = process.__testEnv || process.env,
    argumentOptions = {},
    options = {};

  // go through the arguments and collect possible configuration options
  argv.forEach(function(arg) {

    if (arg.slice(0, 2) === '--' || arg === '-h') {

      arg = arg.replace(/^\-{1,2}/, '');

      var kv = arg.split(/=/),
        key = camelize(kv[0]),
        val = kv.length > 1 ? kv[1] : true;

      argumentOptions[key] = dejsonize(val);

    }

  });

  // Walk the schema
  for (var option in schema) {

    var envizedOptionName = envize(option);

    if (argumentOptions.hasOwnProperty(option)) {

      // get from arguments
      options[option] = argumentOptions[option];

    } else if (env.hasOwnProperty(envizedOptionName)) {

      // get from env.
      options[option] = dejsonize(env[envizedOptionName]);

    } else if (schema[option].hasOwnProperty('default')) {

      // get from schema defaults.
      options[option] = schema[option].default;

    } else if (schema[option].required) {

      // required option not set, throw.
      throw new Error('Missing required option ' + option);

    }

  }

  global.__optometrist.configs[name] = options;
  return options;

};
