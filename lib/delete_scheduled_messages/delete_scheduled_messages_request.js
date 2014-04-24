var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, messages, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');

  _deleteScheduledMessages = subElement(_body, 'ns:deleteScheduledMessages');
  _authentication = subElement(_deleteScheduledMessages, 'ns:authentication');
  _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  _requestBody = subElement(_deleteScheduledMessages, 'ns:requestBody');

  _messages = subElement(_requestBody, 'ns:messages');

  if (messages.length == 0) {
    messages.push({
      messageId : ""
    });
  }

  messages.forEach(function(message) {
    _message = subElement(_messages, 'ns:message');
    _message.attrib = message;
  });

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });
  
  callback(_request);
}
