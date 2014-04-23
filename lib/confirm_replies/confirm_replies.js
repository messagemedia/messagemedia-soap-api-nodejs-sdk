exports.confirmReplies = function(userId, password, replies, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/ConfirmReplies.xsd";
  var contentType = "text/xml"; 
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken; 
  var confirmRepliesRequest = require('./confirm_replies_request.js');
  var confirmRepliesResponse = require('./confirm_replies_response.js');
  var request = confirmRepliesRequest(userId, password, replies, function(request) {
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
      confirmRepliesResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};