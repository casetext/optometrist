
'use strict';

/**
 * dejsonize attempts to parse an argument as a JSON object.
 * @param {String} str the JSON item to dejsonize.
 * @returns {*} The deserialized version of the object.
 */
module.exports = function dejsonize(str) {

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

};
