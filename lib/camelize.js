
'use strict';

/**
 * camelize converts a string from dash-case or SNAKE_CASE into its camelCased equivalent.
 * @param {String} str the string to camelize.
 * @returns {String} The camelized string.
 */
module.exports = function camelize(str) {

  return str.toLowerCase().replace(/(?:[_-])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  });

};
