module.exports = function(data, callback) {

  var etree = require('../common/responseParser.js')(data, callback);
  if(etree === false) {
    return;
  }

  var out = {
    confirmed : parseInt(etree.findall('SOAP-ENV:Body/confirmReportsResponse/result')[0].get('confirmed') || 0, 10)
  };
  
  callback(out);
};
