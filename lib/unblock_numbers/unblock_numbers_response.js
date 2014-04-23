const
et = require('elementtree');

module.exports = function(data, callback) {

  var etree = et.parse(data);

  var out = {
    unblocked : parseInt(etree.findall('SOAP-ENV:Body/unblockNumbersResponse/result')[0].get('unblocked') || 0),
    failed : parseInt(etree.findall('SOAP-ENV:Body/unblockNumbersResponse/result')[0].get('failed') || 0),
    errors : []
  };

  etree.findall('SOAP-ENV:Body/unblockNumbersResponse/result/errors/error').forEach(function(o) {
    var error;
    error = o.attrib;
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
