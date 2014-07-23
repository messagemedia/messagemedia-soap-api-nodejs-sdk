module.exports = function(data, callback) {
  var et = require('elementtree');

  if (!data.length) {
    callback({});
    return false;
  }

  var etree = et.parse(data);

  var authCheck = require('./faultCheck.js')(data);
  if (authCheck) {
    callback(authCheck);
    return false;
  } else {
    return etree;
  }
};