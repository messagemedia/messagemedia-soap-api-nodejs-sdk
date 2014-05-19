module.exports = function(data, callback) {
  
  var et = require('elementtree');

  if (!data.length) {
    callback({});
    return;
  }

  var etree = et.parse(data);

  var authCheck = require('../common/faultCheck.js')(data);
  callback(authCheck || {
        type : etree
            .findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0]
            .get('type'),
        creditLimit : parseInt(etree
            .findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0]
            .get('creditLimit') || 0, 10),
        creditRemaining : parseInt(etree
            .findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0]
            .get('creditRemaining') || 0, 10),
      });
};