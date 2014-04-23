exports.deleteScheduledMessages = function(userId, password, messages, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/DeleteScheduledMessages.xsd";
  var contentType = "text/xml", ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var ws = require('ws.js');
  var deleteScheduledMessagesRequest = require('./delete_scheduled_messages_request.js');
  var deleteScheduledMessagesResponse = require('./delete_scheduled_messages_response.js');
  var request = deleteScheduledMessagesRequest(userId, password, messages, function(request) {
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
      deleteScheduledMessagesResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};