
'use strict';

/**
 * argize converts a string from SNAKE_CASE or camelCase into its dash-cased equivalent.
 * @param {String} str the string to dashize.
 * @returns {String} The dashized string.
 */
module.exports = function argize(str) {

  return str.toLowerCase().replace(/([a-z])([A-Z])/g, function(_, l, u) {
    return l + '-' + u.toLowerCase();
  }).toLowerCase();

};
