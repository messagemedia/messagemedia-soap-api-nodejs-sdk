var config = require('../test/config.json');
var operation = require('../lib/delete_scheduled_messages/delete_scheduled_messages.js');

exports.t1 = function(test, callback) {
  operation.deleteScheduledMessages(config.userId, config.password, [ {
    messageId : 1351
  }, {
    messageId : 1353
  }, {
    messageId : 1354
  }, ], function(result) {

    test.ok(result.faultstring === undefined, result.faultstring);

    // Type check
    test.equals(typeof result.unscheduled, 'number', "DeleteScheduledMessages response 'unscheduled' is not a number");

    callback();
  });
};