exports.blockNumbers = function(userId, password, recipients, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/BlockNumbers.xsd";
  var contentType = "text/xml";
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var blockNumbersRequest = require('./block_numbers_request.js');
  var blockNumbersResponse = require('./block_numbers_response.js');
  var request = blockNumbersRequest(userId, password, recipients, function(request) {
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
      blockNumbersResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};