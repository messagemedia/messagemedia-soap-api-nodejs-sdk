var config = require('../test/config.json');
var operation = require('../lib/check_replies/check_replies.js');

exports.t1 = function(test, callback) {
  operation.checkReplies(config.userId, config.password, 10, function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);

    test.equals(typeof result.returned, 'number', "CheckReplies response 'returned' is not a Number");
    test.equals(typeof result.remaining, 'number', "CheckReplies response 'remaining' is not a Number");

    result.replies.forEach(function(reply) {
      // Check types
      test.equals(typeof reply.format, 'string', "CheckReplies response 'code' is not a String");
      test.equals(typeof reply.uid, 'string', "CheckReplies response 'uid' is not a String");
      test.equals(typeof reply.receiptId, 'string', "CheckReplies response 'receiptId' is not a String");
      test.equals(typeof reply.origin, 'string', "CheckReplies response 'origin' is not a String");
      // test.equals(Object.prototype.toString.call(reply.received) === '[object
      // Date]', 'date', "CheckReplies response 'received' is not a Date");
      test.equals(typeof reply.content, 'string', "CheckReplies response 'content' is not a String");
    });

    callback();
  });
};