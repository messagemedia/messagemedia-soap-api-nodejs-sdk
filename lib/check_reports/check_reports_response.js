const
et = require('elementtree');

module.exports = function(data, callback) {

  var etree = et.parse(data);

  var out = {
    returned : parseInt(etree.findall('SOAP-ENV:Body/checkReportsResponse/result')[0].get('returned') || 0),
    remaining : parseInt(etree.findall('SOAP-ENV:Body/checkReportsResponse/result')[0].get('remaining') || 0),
    reports : []
  };

  etree.findall('SOAP-ENV:Body/checkReportsResponse/result/reports/report').forEach(function(o) {
    var report = Object(o.attrib);
    report.recipient = o.find('recipient').text;
    report.timestamp = new Date(o.find('timestamp').text);
    out.reports.push(report);
  }),

  callback(out);
};
