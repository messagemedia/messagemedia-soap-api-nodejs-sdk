var config = require('../test/config.json');
var operation = require('../lib/unblock_numbers/unblock_numbers.js');

exports.t1 = function(test, callback) {
  operation.unblockNumbers(config.userId, config.password, [ config.calleeNumber ], function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);

    // Check types
    test.equals(typeof result.unblocked, 'number', "UnblockNumbers response 'unblocked' is not a Number");
    test.equals(typeof result.failed, 'number', "UnblockNumbers response 'failed' is not a Number");

    result.errors.forEach(function(error) {
      test.equals(typeof error.code, 'string', "BlockNumbers response 'code' is not a String");
      switch (error.code) {
      case 'invalidRecipient':
        test.ok(true, 'Invalid error code.');
        break;
      case 'recipientBlocked':
        test.ok(true, 'Invalid error code.');
        break;
      case 'emptyMessageContent':
        test.ok(true, 'Invalid error code.');
        break;
      case 'other':
        test.ok(true, 'Invalid error code.');
        break;
      default:
        test.ok(false, "Error code does not match one of the following: invalidRecipient, recipientBlocked, emptyMessageContent, other");
        break;
      }

      test.equals(typeof error.sequenceNumber, 'number', "BlockNumbers response 'errors[?].sequenceNumber' is not a number");
      error.recipients.forEach(function(recipient) {
        test.equals(typeof recipient.uid, 'string', "BlockNumbers response 'errors[?].recipients[?].uid' is not a string");
        test.equals(typeof recipient.number, 'string', "BlockNumbers response 'errors[?].recipients[?].number' is not a string");
      });
    });

    callback();
  });
};