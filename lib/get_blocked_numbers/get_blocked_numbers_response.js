const
et = require('elementtree');

module.exports = function(data, callback) {

  if (!data.length) {
    callback({});
    return;
  }
  
  var etree = et.parse(data);

  var out = {
    found : parseInt(etree.findall('SOAP-ENV:Body/getBlockedNumbersResponse/result')[0].get('found') || '0'),
    returned : parseInt(etree.findall('SOAP-ENV:Body/getBlockedNumbersResponse/result')[0].get('returned') || '0'),
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
