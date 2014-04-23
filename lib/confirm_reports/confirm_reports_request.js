var et = require('elementtree'), XML = et.XML, ElementTree = et.ElementTree, element = et.Element, subElement = et.SubElement;

module.exports = function(userId, password, reports, callback) {

  _root = element('soapenv:Envelope');
  _root.set('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
  _root.set('xmlns:ns', 'http://xml.m4u.com.au/2009');

  subElement(_root, 'soapenv:Header');

  _body = subElement(_root, 'soapenv:Body');

  // confirmReports
  _confirmReports = subElement(_body, 'ns:confirmReports');

  // confirmReports -> authentication
  _authentication = subElement(_confirmReports, 'ns:authentication');
  // confirmReports -> authentication -> userId
  _userId = subElement(_authentication, 'ns:userId');
  _userId.text = userId;
  // confirmReports -> authentication -> password
  _password = subElement(_authentication, 'ns:password');
  _password.text = password;

  // confirmReports -> requestBody
  _requestBody = subElement(_confirmReports, 'ns:requestBody');

  // confirmReports -> requestBody -> reports
  _reports = subElement(_requestBody, 'ns:reports');

  if(reports.length == 0){
	  reports.push({receiptId:""});
  }
  
  reports.forEach(function(report) {
    _report = subElement(_reports, 'ns:report');
    _report.attrib = report;
  });

  _etree = new ElementTree(_root);
  _request = _etree.write({
    'xml_declaration' : false
  });

  callback(_request);
}
