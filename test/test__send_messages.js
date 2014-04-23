var config = require('../test/config.json');
var operation = require('../lib/send_messages/send_messages.js');
var checkError = require('../lib/common/checkError.js');

/*
 * Check types
 */
exports.t1 = function(test, callback) {
  operation.sendMessage(config.userId, config.password, config.testMsg, [ config.calleeNumber ], function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);
    test.equals(typeof result.sent, 'number', "SendMessages response 'sent' is not a Number");
    test.equals(typeof result.scheduled, 'number', "SendMessages response 'scheduled' is not a Number");
    test.equals(typeof result.failed, 'number', "SendMessages response 'failed' is not a Number");
    test.equals(result.accountDetails.type, 'daily', "SendMessages response 'type' is not equals to 'daily'");
    test.equals(typeof result.accountDetails.creditLimit, 'number', "SendMessages response 'creditLimit' is not a Number");
    test.equals(typeof result.accountDetails.creditRemaining, 'number', "SendMessages response 'creditRemaining' is not a Number");
    test.equals(Array.isArray(result.errors), true, "SendMessages response 'errors' is not an Array");

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
      test.equals(typeof error.sequenceNumber, 'number', "SendMessages response 'errors[?].sequenceNumber' is not a number");
      error.recipients.forEach(function(recipient) {
        test.equals(typeof recipient.uid, 'string', "SendMessages response 'errors[?].recipients[?].uid' is not a string");
        test.equals(typeof recipient.number, 'string', "SendMessages response 'errors[?].recipients[?].number' is not a string");
      });
    });

    callback();
  });
};

/*
 * Expect: 0 messages to be sent && 1 message to fail && errors to contain the
 * code 'recipientBlocked'
 */
exports.t2 = function(test, callback) {
  operation.sendMessage(config.userId, config.password, config.testMsg, [ config.calleeNumber ], function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);

    test.equals(result.sent, 0, "Expected 0 messages to be sent but " + result.sent + " were sent.");
    test.equals(result.failed, 1, "Expected 1 messages to fail but " + result.sent + " failed.");

    test.ok(checkError.containsCode(result.errors, 'recipientBlocked'), "No errors found with 'recipientBlocked' code.");

    callback();
  });
};

/*
 * Expect: 1 message to be sent && 0 message to fail && errors to contain the
 * code 'recipientBlocked'
 */
exports.t3 = function(test, callback) {
  operation.sendMessage(config.userId, config.password, config.testMsg, [ config.calleeNumber ], function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);

    test.equals(result.sent, 1, "Expected 0 messages to be sent but " + result.sent + " were sent.");
    test.equals(result.failed, 0, "Expected 1 messages to fail but " + result.sent + " failed.");

    callback();
  });
};