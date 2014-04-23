const
et = require('elementtree');

module.exports = function(data, callback) {

  var etree = et.parse(data);

  var out = {
    blocked : parseInt(etree.findall('SOAP-ENV:Body/blockNumbersResponse/result')[0].get('blocked') || 0),
    failed : parseInt(etree.findall('SOAP-ENV:Body/blockNumbersResponse/result')[0].get('failed') || 0),
    errors : []
  };

  etree.findall('SOAP-ENV:Body/blockNumbersResponse/result/errors/error').forEach(function(o) {
    var error;
    error = {
      code : o.attrib.code,
      sequenceNumber : parseInt(o.attrib.sequenceNumber)
    };
    error.recipients = new Array();
    o._children.forEach(function(oo) {
      oo._children.forEach(function(recipient) {
        error.recipients.push({
          uid : recipient.attrib.uid,
          number : recipient.text
        });
      });
    });

    out.errors.push(error);
  });

  callback(out);
};
