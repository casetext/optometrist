
'use strict';

function dejsonize(str) {

  var rv;
  try {
    rv = JSON.parse(str);
  } catch(e) {
    try {
      rv = JSON.parse('"' + str.replace(/"/g, '\"') + '"');
    } catch(e2) {
      rv = null;
    }
  }

  return rv;

}

function camelize(str) {

  return str.replace(/(?:[_-])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  });

}

function argize(str) {

  return str.replace(/([a-z])([A-Z])/g, function(_, l, u) {
    return l + '-' + u.toLowerCase();
  }).toLowerCase();

}

function envize(str) {

  return str.replace(/([a-z])([A-Z])/g, function(_, l, u) {
    return l.toUpperCase() + '_' + u;
  }).toUpperCase();

}


module.exports = {

  get: function(schema) {

    var args = Array.prototype.slice.call(arguments, 0),
      argv = module.exports.get.__argv || process.argv,
      env = module.exports.get.__env || process.env,
      parsedOptions = {};

    argv.forEach(function(arg) {

      if (arg.slice(0, 2) === '--') {

        arg = arg.replace(/^\-{1,2}/, '');

        var kv = arg.split(/=/),
          key = camelize(kv[0]),
          val = kv.length > 1 ? kv[1] : true;

        if (schema.hasOwnProperty(key)) {
          parsedOptions[key] = dejsonize(val);
        }

      }

    });

    Object.keys(schema).forEach(function(option) {

      var envizedOption = envize(option);
      if ( !parsedOptions.hasOwnProperty(option) ) {

        if ( env.hasOwnProperty(envizedOption) ) {

          // get from env.
          parsedOptions[option] = dejsonize(env[envizedOption]);

        } else if ( schema[option].hasOwnProperty('default') ) {

          // get from defaults.
          parsedOptions[option] = schema[option].default;

        } else if ( schema[option].hasOwnProperty('required') ) {
          throw new Error('Missing required option ' + option);
        }

      }

    });

    return parsedOptions;

  },

  usage: function(name, desc, schema) {

    var usageStr = '\n' + desc + '\n' +
      'Usage: ' + name + ' options \n\nOptions:\n\n';

    Object.keys(schema).forEach(function(option) {

      var optionStr = '--' + option;

      if (schema[option].default) {
        optionStr += '=' + JSON.stringify(schema[option].default);
      }

      if (!schema[option].required) {
        optionStr = '[ ' + optionStr + ' ]';
      }

      if (schema[option].description) {
        optionStr = optionStr + ' : ' + schema[option].description;
      }

      usageStr += '\t' + optionStr + '\n';

    });

    usageStr += '\n' + 'Any of the parameters can also be set by environment variables:\n\n';

    Object.keys(schema).forEach(function(option) {

      usageStr += '\t' + envize(option);

      if (schema[option].default) {
        usageStr += '=' + schema[option].default;
      }

      if (schema[option].description) {
        usageStr += ' : ' + schema[option].description;
      }

      usageStr += '\n';

    });

    return usageStr;

  }

};

