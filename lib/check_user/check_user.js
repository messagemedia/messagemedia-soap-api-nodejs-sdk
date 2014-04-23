exports.checkUser = function(userId, password, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/CheckUser.xsd";
  var contentType = "text/xml";
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var checkUserRequest = require('./check_user_request.js');
  var checkUserResponse = require('./check_user_response.js');
  var request = checkUserRequest(userId, password, function(request) {
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
      checkUserResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};