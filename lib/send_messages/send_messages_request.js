module.exports = function(userId, password, content, recipients, callback) {

  var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;
  
  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');
  var _sendMessages = subElement(_body, 'ns:sendMessages');
  var _authentication = subElement(_sendMessages, 'ns:authentication');
  var _userId = subElement(_authentication, 'ns:userId');
  var _password = subElement(_authentication, 'ns:password');
  _userId.text = userId;
  _password.text = password;
  var _requestBody = subElement(_sendMessages, 'ns:requestBody');
  var _messages = subElement(_requestBody, 'ns:messages');

  var _message = subElement(_messages, 'ns:message');
  _message.attrib.format = "SMS";
  _message.attrib.sequenceNumber = "1";
  var _recipients = subElement(_message, 'ns:recipients');

  recipients.forEach(function(recipient, index) {
    var _recipient = subElement(_recipients, 'ns:recipient');
    _recipient.attrib.uid = index;
    _recipient.text = recipient;
  });

  var _content = subElement(_message, 'ns:content');
  _content.text = content;

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
};
