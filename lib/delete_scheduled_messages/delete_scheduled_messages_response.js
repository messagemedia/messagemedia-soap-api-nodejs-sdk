module.exports = function(data, callback) {

  var etree = require('../common/responseParser.js')(data, callback);
  if(etree === false) {
    return;
  }
  
  var out = {
    unscheduled : parseInt(etree.findall('SOAP-ENV:Body/deleteScheduledMessagesResponse/result')[0].get('unscheduled') || 0, 10),
  };
  
  callback(out);
};
