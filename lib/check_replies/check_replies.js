exports.checkReplies = function(userId, password, maximumReplies, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/CheckReplies.xsd";
  var contentType = "text/xml";
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var checkRepliesRequest = require('./check_replies_request.js');
  var checkRepliesResponse = require('./check_replies_response.js');
  var request = checkRepliesRequest(userId, password, maximumReplies, function(request) {
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
      checkRepliesResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};