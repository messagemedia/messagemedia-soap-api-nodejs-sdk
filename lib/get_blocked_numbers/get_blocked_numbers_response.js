module.exports = function(data, callback) {

  var etree = require('../common/responseParser.js')(data, callback);
  if(etree === false) {
    return;
  }
  
  var out = {
    found : parseInt(etree.findall('SOAP-ENV:Body/getBlockedNumbersResponse/result')[0].get('found') || '0', 10),
    returned : parseInt(etree.findall('SOAP-ENV:Body/getBlockedNumbersResponse/result')[0].get('returned') || '0', 10),
    recipients : []
  };

  etree.findall('SOAP-ENV:Body/getBlockedNumbersResponse/result/recipients/recipient').forEach(function(recipient) {
    out.recipients.push({
      uid : recipient.attrib.uid,
      number : recipient.text
    });
  });

  callback(out);
};
