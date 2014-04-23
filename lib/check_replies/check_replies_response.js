const
et = require('elementtree');

module.exports = function(data, callback) {

  var etree = et.parse(data);

  var out = {
    returned : parseInt(etree.findall('SOAP-ENV:Body/checkRepliesResponse/result')[0].get('returned') || 0),
    remaining : parseInt(etree.findall('SOAP-ENV:Body/checkRepliesResponse/result')[0].get('remaining') || 0),
    replies : []
  };

  etree.findall('SOAP-ENV:Body/checkRepliesResponse/result/replies/reply').forEach(function(o) {
    var reply = Object(o.attrib);
    reply.origin = o.find('origin').text;
    reply.received = new Date(o.find('received').text);
    reply.content = o.find('content').text;
    out.replies.push(reply);
  }),

  callback(out);
};
