exports.checkReports = function(userId, password, maximumReports, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/CheckReports.xsd";
  var contentType = "text/xml";
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var checkReportsRequest = require('./check_reports_request.js');
  var checkReportsResponse = require('./check_reports_response.js');
  var request = checkReportsRequest(userId, password, maximumReports, function(request) {
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
      checkReportsResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};