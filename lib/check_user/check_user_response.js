const
et = require('elementtree');
const
assert = require('assert');

module.exports = function(data, callback) {

  var etree = et.parse(data);

  var authCheck = require('../common/faultCheck.js')(data);
  callback(authCheck || {
    type : etree.findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0].get('type'),
    creditLimit : parseInt(etree.findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0].get('creditLimit') || 0),
    creditRemaining : parseInt(etree.findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0].get('creditRemaining') || 0),
  });
};