var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, maximumRecipients, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');

  // getBlockedNumbers
  _getBlockedNumbers = subElement(_body, 'ns:getBlockedNumbers');

  // getBlockedNumbers -> authentication
  _authentication = subElement(_getBlockedNumbers, 'ns:authentication');
  // getBlockedNumbers -> authentication -> userId
  _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // getBlockedNumbers -> authentication -> password
  _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // getBlockedNumbers -> requestBody
  _requestBody = subElement(_getBlockedNumbers, 'ns:requestBody');

  // confirmReplies -> requestBody -> replies
  _maximumRecipients = subElement(_requestBody, 'ns:maximumRecipients');

  _maximumRecipients.text = maximumRecipients;

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
}
