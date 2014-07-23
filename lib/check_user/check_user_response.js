module.exports = function(data, callback) {

  var etree = require('../common/responseParser.js')(data, callback);
  if(etree === false) {
    return;
  }

  var out = {
        type : etree.findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0].get('type'),
        creditLimit : parseInt(etree.findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0].get('creditLimit') || 0, 10),
        creditRemaining : parseInt(etree.findall('SOAP-ENV:Body/checkUserResponse/result/accountDetails')[0].get('creditRemaining') || 0, 10),
      };

  callback(out);
};