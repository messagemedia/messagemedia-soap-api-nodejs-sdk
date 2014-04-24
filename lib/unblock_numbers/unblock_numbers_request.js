var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, numbers, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');

  _unblockNumbers = subElement(_body, 'ns:unblockNumbers');
  _authentication = subElement(_unblockNumbers, 'ns:authentication');
  _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  _requestBody = subElement(_unblockNumbers, 'ns:requestBody');

  _recipients = subElement(_requestBody, 'ns:recipients');

  numbers.forEach(function(recipient, index) {
    _recipient = subElement(_recipients, 'ns:recipient');
    _recipient.attrib["uid"] = index;
    _recipient.text = recipient;
  });

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
}
