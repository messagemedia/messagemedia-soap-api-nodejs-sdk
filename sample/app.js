
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , messagemedia = require('../index.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
};


/*
 * Routes
 */
app.get('/', routes.index);

app.post('/api/checkUser', function(req, res){
  messagemedia.checkUser(req.body.userId, req.body.password, function(result){
    res.send(result);
  });
});

app.post('/api/checkReplies', function(req, res){
  messagemedia.checkReplies(req.body.userId, req.body.password, req.body.maximumReplies || 10, function(result){
    res.send(result);
  });
});

app.post('/api/checkReports', function(req, res){
  messagemedia.checkReports(req.body.userId, req.body.password, req.body.maximumReports || 10, function(result){
    res.send(result);
  });
});

app.post('/api/getBlockedNumbers', function(req, res){
  messagemedia.getBlockedNumbers(req.body.userId, req.body.password, req.body.maximumNumbers || 10, function(result){
    res.send(result);
  });
});

app.post('/api/blockNumbers', function(req, res){
  messagemedia.blockNumbers(req.body.userId, req.body.password, req.body.numbers, function(result){
    res.send(result);
  });
});

app.post('/api/unblockNumbers', function(req, res){
  messagemedia.unblockNumbers(req.body.userId, req.body.password, req.body.numbers, function(result){
    res.send(result);
  });
});

app.post('/api/confirmReplies', function(req, res){
  messagemedia.confirmReplies(req.body.userId, req.body.password, req.body.replies, function(result){
    res.send(result);
  });
});

app.post('/api/confirmReports', function(req, res){
  messagemedia.confirmReports(req.body.userId, req.body.password, req.body.reports, function(result){
    res.send(result);
  });
});

app.post('/api/sendMessage', function(req, res){
  messagemedia.sendMessage(req.body.userId, req.body.password, req.body.content, req.body.numbers, function(result){
    res.send(result);
  });
});

app.post('/api/deleteScheduledMessages', function(req, res){
  messagemedia.deleteScheduledMessages(req.body.userId, req.body.password, req.body.messages, function(result){
    res.send(result);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
