module.exports = function(userId, password, replies, callback) {
  var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;
  
  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');

  // confirmReplies
  var _confirmReplies = subElement(_body, 'ns:confirmReplies');

  // confirmReplies -> authentication
  var _authentication = subElement(_confirmReplies, 'ns:authentication');
  // confirmReplies -> authentication -> userId
  var _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // confirmReplies -> authentication -> password
  var _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // confirmReplies -> requestBody
  var _requestBody = subElement(_confirmReplies, 'ns:requestBody');

  // confirmReplies -> requestBody -> replies
  var _replies = subElement(_requestBody, 'ns:replies');

  if(replies.length === 0){
    replies.push({receiptId:""});
  }
  
  replies.forEach(function(reply) {
    var _reply = subElement(_replies, 'ns:reply');
    _reply.attrib = reply;
  });

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
};
