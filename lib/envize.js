
'use strict';

/**
 * envize converts a string from dash-case or camelCase into its SNAKE_CASED equivalent.
 * @param {String} str the string to envize.
 * @returns {String} The envized string.
 */
module.exports = function envize(str) {

  return str.replace(/([a-z])([A-Z])/g, function(_, l, u) {
    return l.toUpperCase() + '_' + u;
  }).toUpperCase();

};
