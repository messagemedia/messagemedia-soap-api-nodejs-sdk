exports.getBlockedNumbers = function(userId, password, maximumRecipients, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/GetBlockedNumbers.xsd";
  var contentType = "text/xml";
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var getBlockedNumbersRequest = require('./get_blocked_numbers_request.js');
  var getBlockedNumbersResponse = require('./get_blocked_numbers_response.js');
  var request = getBlockedNumbersRequest(userId, password, maximumRecipients, function(request) {
    var ctx = {
      request : request,
      url : url,
      action : action,
      contentType : contentType
    };
    var handlers = [ new Security({}, [ new UsernameToken({
      username : userId,
      password : password
    }) ]), new Http() ];
    ws.send(handlers, ctx, function(ctx) {
      getBlockedNumbersResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};