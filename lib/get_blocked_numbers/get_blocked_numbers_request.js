module.exports = function(userId, password, maximumRecipients, callback) {

  var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;
  
  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');

  // getBlockedNumbers
  var _getBlockedNumbers = subElement(_body, 'ns:getBlockedNumbers');

  // getBlockedNumbers -> authentication
  var _authentication = subElement(_getBlockedNumbers, 'ns:authentication');
  // getBlockedNumbers -> authentication -> userId
  var _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // getBlockedNumbers -> authentication -> password
  var _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // getBlockedNumbers -> requestBody
  var _requestBody = subElement(_getBlockedNumbers, 'ns:requestBody');

  // confirmReplies -> requestBody -> replies
  var _maximumRecipients = subElement(_requestBody, 'ns:maximumRecipients');

  _maximumRecipients.text = maximumRecipients;

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
};
