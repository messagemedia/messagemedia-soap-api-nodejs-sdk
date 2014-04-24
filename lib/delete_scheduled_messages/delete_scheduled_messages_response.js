const
et = require('elementtree');

module.exports = function(data, callback) {

  if (!data.length) {
    callback({unscheduled : 0});
    return;
  }

  var etree = et.parse(data);

  callback({
    unscheduled : parseInt(etree
        .findall('SOAP-ENV:Body/deleteScheduledMessagesResponse/result')[0]
        .get('unscheduled') || 0),
  });
};
