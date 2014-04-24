exports.unblockNumbers = function(userId, password, numbers, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/UnblockNumbers.xsd";
  var contentType = "text/xml", ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var ws = require('ws.js');
  var unblockNumbersRequest = require('./unblock_numbers_request.js');
  var unblockNumbersResponse = require('./unblock_numbers_response.js');
  if(!numbers.length){
    numbers = [""];
  }
  var request = unblockNumbersRequest(userId, password, numbers, function(request) {
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
      unblockNumbersResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};