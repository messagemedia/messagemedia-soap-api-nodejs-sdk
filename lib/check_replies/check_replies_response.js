module.exports = function(data, callback) {

  var etree = require('../common/responseParser.js')(data, callback);
  if(etree === false) {
    return;
  }
  
  var out = {
    returned : parseInt(etree.findall('SOAP-ENV:Body/checkRepliesResponse/result')[0].get('returned') || 0, 10),
    remaining : parseInt(etree.findall('SOAP-ENV:Body/checkRepliesResponse/result')[0].get('remaining') || 0, 10),
    replies : []
  };

  etree.findall('SOAP-ENV:Body/checkRepliesResponse/result/replies/reply').forEach(function(o) {
    var reply = Object(o.attrib);
    reply.origin = o.find('origin').text;
    reply.received = new Date(o.find('received').text);
    reply.content = o.find('content').text;
    out.replies.push(reply);
  });

  callback(out);
};
