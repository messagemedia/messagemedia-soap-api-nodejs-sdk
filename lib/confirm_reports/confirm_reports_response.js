const
et = require('elementtree');

module.exports = function(data, callback) {

  var etree = et.parse(data);

  callback({
    confirmed : parseInt(etree.findall('SOAP-ENV:Body/confirmReportsResponse/result')[0].get('confirmed') || 0)
  });
};
