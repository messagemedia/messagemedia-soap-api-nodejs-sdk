module.exports = function(userId, password, messages, callback) {

  var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;
  
  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');

  var _deleteScheduledMessages = subElement(_body, 'ns:deleteScheduledMessages');
  var _authentication = subElement(_deleteScheduledMessages, 'ns:authentication');
  var _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  var _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  var _requestBody = subElement(_deleteScheduledMessages, 'ns:requestBody');

  var _messages = subElement(_requestBody, 'ns:messages');

  if (messages.length === 0) {
    messages.push({
      messageId : ""
    });
  }

  messages.forEach(function(message) {
    var _message = subElement(_messages, 'ns:message');
    _message.attrib = message;
  });

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });
  
  callback(_request);
};
