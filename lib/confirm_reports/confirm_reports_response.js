module.exports = function(data, callback) {

  var et = require('elementtree');
  
  if (!data.length) {
    callback({});
    return;
  }
  
  var etree = et.parse(data);

  callback({
    confirmed : parseInt(etree.findall('SOAP-ENV:Body/confirmReportsResponse/result')[0].get('confirmed') || 0, 10)
  });
};
