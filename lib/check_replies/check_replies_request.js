// TODO: This file is not tested.

var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, maximumReplies, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');

  // checkReplies
  _checkReplies = subElement(_body, 'ns:checkReplies');

  // checkReplies -> authentication
  _authentication = subElement(_checkReplies, 'ns:authentication');
  // checkReplies -> authentication -> userId
  _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // checkReplies -> authentication -> password
  _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // checkReplies -> requestBody
  _requestBody = subElement(_checkReplies, 'ns:requestBody');

  // checkReplies -> requestBody -> maximumReplies
  _maximumReplies = subElement(_requestBody, 'ns:maximumReplies');
  _maximumReplies.text = maximumReplies;

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });

  // console.log(_request);

  callback(_request);
}
