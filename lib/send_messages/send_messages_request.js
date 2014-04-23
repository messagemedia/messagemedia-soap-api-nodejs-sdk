var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, content, recipients, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');
  _sendMessages = subElement(_body, 'ns:sendMessages');
  _authentication = subElement(_sendMessages, 'ns:authentication');
  _userId = subElement(_authentication, 'ns:userId');
  _password = subElement(_authentication, 'ns:password');
  _userId.text = userId;
  _password.text = password;
  _requestBody = subElement(_sendMessages, 'ns:requestBody');
  _messages = subElement(_requestBody, 'ns:messages');

  _message = subElement(_messages, 'ns:message');
  _message.attrib["format"] = "SMS";
  _message.attrib["sequenceNumber"] = "1";
  _recipients = subElement(_message, 'ns:recipients');

  recipients.forEach(function(recipient, index) {
    _recipient = subElement(_recipients, 'ns:recipient');
    _recipient.attrib["uid"] = index;
    _recipient.text = recipient;
  });

  _content = subElement(_message, 'ns:content');
  _content.text = content;

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
}
