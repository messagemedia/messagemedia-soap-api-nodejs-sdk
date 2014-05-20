module.exports = function(userId, password, reports, callback) {

  var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;
  
  var _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  var _body = subElement(_root, 'soapenv:Body');

  // confirmReports
  var _confirmReports = subElement(_body, 'ns:confirmReports');

  // confirmReports -> authentication
  var _authentication = subElement(_confirmReports, 'ns:authentication');
  // confirmReports -> authentication -> userId
  var _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // confirmReports -> authentication -> password
  var _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // confirmReports -> requestBody
  var _requestBody = subElement(_confirmReports, 'ns:requestBody');

  // confirmReports -> requestBody -> reports
  var _reports = subElement(_requestBody, 'ns:reports');

  if(reports.length === 0){
    reports.push({receiptId:""});
  }
  
  reports.forEach(function(report) {
    var _report = subElement(_reports, 'ns:report');
    _report.attrib = report;
  });

  var _etree = new ElementTree(_root);
  var _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
};
