exports.confirmReports = function(userId, password, reports, callback) {
  var url = "https://soap.m4u.com.au/";
  var action = "https://xml.m4u.com.au/2009/ConfirmReports.xsd";
  var contentType = "text/xml";
  var ws = require('ws.js');
  var Http = ws.Http;
  var Security = ws.Security;
  var UsernameToken = ws.UsernameToken;
  var confirmReportsRequest = require('./confirm_reports_request.js');
  var confirmReportsResponse = require('./confirm_reports_response.js');
  var request = confirmReportsRequest(userId, password, reports, function(request) {
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
      confirmReportsResponse(ctx.response, function(result) {
        callback(result);
      });
    });
  });
};