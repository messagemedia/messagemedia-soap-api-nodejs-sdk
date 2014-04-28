const
et = require('elementtree');

module.exports = function(data, callback) {

  if (!data.length) {
    callback({});
    return;
  }
  
  var etree = et.parse(data);

  var out = {
    sent : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('sent') || 0),
    scheduled : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('scheduled') || 0),
    failed : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('failed') || 0),
    accountDetails : {
      type : etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('type'),
      creditLimit : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('creditLimit') || 0),
      creditRemaining : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('creditRemaining') || 0)
    },
    errors : []
  };

  etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/errors/error').forEach(function(o) {
    var error;
    error = {
      code : o.attrib.code,
      sequenceNumber : parseInt(o.sequenceNumber)
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
