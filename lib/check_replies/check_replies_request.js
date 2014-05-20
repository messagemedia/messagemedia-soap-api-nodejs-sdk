module.exports = function(userId, password, maximumReplies, callback) {

  var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;
  
  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');

  // checkReplies
  var _checkReplies = subElement(_body, 'ns:checkReplies');

  // checkReplies -> authentication
  var _authentication = subElement(_checkReplies, 'ns:authentication');
  // checkReplies -> authentication -> userId
 var _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // checkReplies -> authentication -> password
  var _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // checkReplies -> requestBody
  var _requestBody = subElement(_checkReplies, 'ns:requestBody');

  // checkReplies -> requestBody -> maximumReplies
  var _maximumReplies = subElement(_requestBody, 'ns:maximumReplies');
  _maximumReplies.text = maximumReplies;

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });

  // console.log(_request);

  callback(_request);
};
