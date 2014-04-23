var config = require('../test/config.json');
var operation = require('../lib/get_blocked_numbers/get_blocked_numbers.js');

exports.t1 = function(test, callback) {
  operation.getBlockedNumbers(config.userId, config.password, 10, function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);

    // Type check
    test.equals(typeof result.found, 'number', "GetBlockedNumbers response 'found' is not a number");
    test.equals(typeof result.returned, 'number', "GetBlockedNumbers response 'returned' is not a number");

    result.recipients.forEach(function(recipient) {
      test.equals(typeof recipient.uid, 'string', "GetBlockedNumbers response 'errors[?].recipients[?].uid' is not a string");
      test.equals(typeof recipient.number, 'string', "GetBlockedNumbers response 'errors[?].recipients[?].number' is not a string");
    });
    callback();
  });
}