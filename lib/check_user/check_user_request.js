module.exports = function(userId, password, callback) {
  
  var et = require('elementtree'), ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');
  var _checkUser = subElement(_body, 'ns:checkUser');
  var _authentication = subElement(_checkUser, 'ns:authentication');
  var _userId = subElement(_authentication, 'ns:userId');
  var _password = subElement(_authentication, 'ns:password');
  _userId.text = userId;
  _password.text = password;

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
};
