exports.sendMessage = function(userId, password, content, numbers, deliveryReport, scheduledTime, messageId, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/SendMessages.xsd";
  var contentType = "text/xml";
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var sendMessageRequest = require('./send_messages_request.js');
  var sendMessageResponse = require('./send_messages_response.js');
  if(!numbers.length){
    numbers = [""];
  }
  var request = sendMessageRequest(userId, password, content, numbers, deliveryReport, scheduledTime, messageId, function(request) {
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
      sendMessageResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};