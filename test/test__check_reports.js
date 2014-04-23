var config = require('../test/config.json');
var operation = require('../lib/check_reports/check_reports.js');

exports.t1 = function(test, callback) {
  operation.checkReports(config.userId, config.password, 100, function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);

    // Check types
    test.equals(typeof result.returned, 'number', "CheckReports response 'returned' is not a Number");
    test.equals(typeof result.remaining, 'number', "CheckReports response 'remaining' is not a Number");

    // Check data
    test.equals(result.reports.length, result.returned, 'The stated number of reports does not equals number of reports returned.');

    result.reports.forEach(function(report) {
      // Check types
      test.equals(typeof report.uid, 'string', "CheckReports response 'uid' is not a String");
      test.equals(typeof report.receiptId, 'string', "CheckReports response 'receiptId' is not a String");
      test.equals(typeof report.status, 'string', "CheckReports response 'status' is not a String");
      test.equals(typeof report.recipient, 'string', "CheckReports response 'recipient' is not a String");
      // test.equals(typeof report.timestamp, 'date', "CheckReports response
      // 'timestamp' is not a Date");

      // Check data
      switch (report.status) {
      case 'delivered':
        test.ok(true, 'Invalid status code.');
        break;
      case 'pending':
        test.ok(true, 'Invalid status code.');
        break;
      case 'failed':
        test.ok(true, 'Invalid status code.');
        break;
      case 'unknown':
        test.ok(true, 'Invalid status code.');
        break;
      default:
        test.ok(false, "Status code does not match one of the following: delivered, pending, failed, unknown");
        break;
      }
    });

    callback();
  });
}