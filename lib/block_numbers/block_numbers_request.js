module.exports = function(userId, password, recipients, callback) {

  var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;
  
  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');

  var _blockNumbers = subElement(_body, 'ns:blockNumbers');
  var _authentication = subElement(_blockNumbers, 'ns:authentication');
  var _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  var _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  var _requestBody = subElement(_blockNumbers, 'ns:requestBody');

  var _recipients = subElement(_requestBody, 'ns:recipients');

  recipients.forEach(function(recipient, index) {
    var _recipient = subElement(_recipients, 'ns:recipient');
    _recipient.attrib.uid = index;
    _recipient.text = recipient;
  });

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
};
