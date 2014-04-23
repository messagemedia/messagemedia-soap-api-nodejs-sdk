var et = require('elementtree'), ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');
  _checkUser = subElement(_body, 'ns:checkUser');
  _authentication = subElement(_checkUser, 'ns:authentication');
  _userId = subElement(_authentication, 'ns:userId');
  _password = subElement(_authentication, 'ns:password');
  _userId.text = userId;
  _password.text = password;

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
}
