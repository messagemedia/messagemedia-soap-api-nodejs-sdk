var testCase = require('nodeunit').testCase;

var checkUser = require('./test__check_user.js');
var blockNumbers = require('./test__block_numbers.js');
var sendMessages = require('./test__send_messages.js');
var checkReplies = require('./test__check_replies.js');
var checkReports = require('./test__check_reports.js');
var confirmReplies = require('./test__confirm_replies.js');
var confirmReports = require('./test__confirm_reports.js');
var deleteScheduledMessages = require('./test__delete_scheduled_messages.js');
var getBlockedNumbers = require('./test__get_blocked_numbers.js');
var unblockNumbers = require('./test__unblock_numbers.js');

module.exports = testCase({
  "Initialisation" : testCase(function(test)
  /*
   * PRE UNIT TESTS INITIALISATION Clear all blocked numbers.
   */
  {
    var config = require('../test/config.json');
    require("../lib/get_blocked_numbers/get_blocked_numbers.js")
        .getBlockedNumbers(
            config.userId,
            config.password,
            100,
            function(blockedNumbers) {
              if (blockedNumbers.returned !== 0) {
                var numbers = [];

                blockedNumbers.recipients.forEach(function(recipient) {
                  numbers.push(recipient.number);
                });

                require("../lib/unblock_numbers/unblock_numbers.js")
                    .unblockNumbers(config.userId, config.password, numbers,
                        function(numbersUnblocked) {

                        });
              }
            });
    test.done();
  }),
  "TC 1" : testCase({
    "TC 1.1" : function(test) {
      checkUser.t1(test, function(result) {
        test.done();
      });
    },
    "TC 1.2" : function(test) {
      checkReplies.t1(test, function(result) {
        test.done();
      });
    },
    "TC 1.3" : function(test) {
      checkReports.t1(test, function(result) {
        test.done();
      });
    },
  }),
  "TC 2" : testCase({
    "TC 2.1" : function(test) {
      getBlockedNumbers.t1(test, function() {
        test.done();
      });
    },
    "TC 2.2" : function(test) {
      blockNumbers.t1(test, function() {
        test.done();
      });
    },
    "TC 2.3" : function(test) {
      unblockNumbers.t1(test, function() {
        test.done();
      });
    }
  }),
  "TC 3" : testCase({
    "TC 3.1" : function(test) {
      confirmReplies.t1(test, function(result) {
        test.done();
      });
    },
    "TC 3.2" : function(test) {
      confirmReports.t1(test, function(result) {
        test.done();
      });
    },
  }),
  "TC 4" : testCase({
    "TC 4.1" : function(test) {
      sendMessages.t1(test, function(result) {
        test.done();
      });
    },
    "TC 4.2" : function(test) {
      deleteScheduledMessages.t1(test, function(result) {
        test.done();
      });
    },
  })
});