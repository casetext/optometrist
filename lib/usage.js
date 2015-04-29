
'use strict';

var argize = require('./argize'),
  envize = require('./envize');

module.exports = function usage(name, description) {

  var usageStr = '\n' + description + '\n' +
    'Usage: ' + name + ' options \n\nOptions:\n\n',
    option,
    optionStr,
    optionStrCellWidth = 0,
    options = [{
      flag: '--help, -h',
      message: 'Print this message and exit'
    }];

  for (var schemaKey in global.__optometrist.schemas) {

    var schema = global.__optometrist.schemas[schemaKey];

    for (option in schema) {

      optionStr = '--' + argize(option);

      if (schema[option].default) {
        optionStr += '=' + JSON.stringify(schema[option].default);
      }

      if (!schema[option].required) {
        optionStr = '[ ' + optionStr + ' ]';
      }

      options.push({
        flag: optionStr,
        message: schema[option].description || '',
      });

      optionStrCellWidth = Math.max(optionStrCellWidth, optionStr.length);

    }

    options.forEach(function(optionObject) {

      usageStr += '\t' + optionObject.flag;

      var paddingLength = optionStrCellWidth - optionObject.flag.length;
      for (var i = 0; i < paddingLength; i++) {
        usageStr += ' ';
      }
      usageStr += '  ' + optionObject.message + '\n';

    });

    usageStr += '\n' + 'Any of these parameters can also be set by environment variables:\n\n';

    for (option in schema) {
      usageStr += '\t' + envize(option) + '\n';
    }

  }

  return usageStr;

};
