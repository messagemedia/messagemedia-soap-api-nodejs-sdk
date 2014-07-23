module.exports = function(data, callback) {

  var etree = require('../common/responseParser.js')(data, callback);
  if(etree === false) {
    return;
  }
  
  var out = {
    sent : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('sent') || 0, 10),
    scheduled : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('scheduled') || 0, 10),
    failed : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('failed') || 0, 10),
    accountDetails : {
      type : etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('type'),
      creditLimit : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('creditLimit') || 0, 10),
      creditRemaining : parseInt(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('creditRemaining') || 0, 10)
    },
    errors : []
  };

  etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/errors/error').forEach(function(o) {
    var error;
    error = {
      code : o.attrib.code,
      sequenceNumber : parseInt(o.sequenceNumber, 10)
    };
    error.recipients = [];
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
