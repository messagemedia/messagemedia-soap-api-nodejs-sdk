var config = require('../test/config.json');
var operation = require('../lib/check_user/check_user.js');

exports.t1 = function(test, callback) {
  operation.checkUser(config.userId, config.password, function(result) {
    test.ok(result.faultstring === undefined, result.faultstring);
    test.equals(result.type, 'daily', "CheckUser response 'type' is not equal to 'daily'");
    test.equals(typeof result.creditLimit, 'number', "CheckUser response 'creditLimit' is not a Number");
    test.equals(typeof result.creditRemaining, 'number', "CheckUser response 'creditRemaining' is not a Number");
    callback(result);
  });
}