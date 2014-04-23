var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, maximumReports, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');

  // checkReports
  _checkReports = subElement(_body, 'ns:checkReports');

  // checkReports -> authentication
  _authentication = subElement(_checkReports, 'ns:authentication');
  // checkReports -> authentication -> userId
  _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // checkReports -> authentication -> password
  _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // checkReports -> requestBody
  _requestBody = subElement(_checkReports, 'ns:requestBody');

  // checkReports -> requestBody -> maximumReports
  _maximumReports = subElement(_requestBody, 'ns:maximumReports');
  _maximumReports.text = maximumReports;

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
}
