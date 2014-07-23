module.exports = function(data, callback) {
  
  var etree = require('../common/responseParser.js')(data, callback);
  if(etree === false) {
    return;
  }
  
  var out = {
    returned : parseInt(etree.findall('SOAP-ENV:Body/checkReportsResponse/result')[0].get('returned') || 0, 10),
    remaining : parseInt(etree.findall('SOAP-ENV:Body/checkReportsResponse/result')[0].get('remaining') || 0, 10),
    reports : []
  };

  etree.findall('SOAP-ENV:Body/checkReportsResponse/result/reports/report').forEach(function(o) {
    var report = Object(o.attrib);
    report.recipient = o.find('recipient').text;
    report.timestamp = new Date(o.find('timestamp').text);
    out.reports.push(report);
  });

  callback(out);
};
