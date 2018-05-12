var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);





var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var request = require("request");


app.post("/api/companys/:cid/users", bodyParser.json(), function (req, res, next) {
  console.log(req.body);
  request.post({
    url: "http://lottehotel.koreacentral.cloudapp.azure.com/companys/" + req.params.cid + "/users",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json"
    }
  },
    function (err, res2, body) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      console.log(body);
      res.send(body);
    });
});



app.use('/api', function (req, res, next) {
  var ip = (req.headers['x-forwarded-for'] || '').split(',')[0]
    || req.connection.remoteAddress;
  req.headers['x-forwarded-for-client-ip'] = ip;
  proxy.web(req, res, {
    target: {
      protocol: 'http:',
      host: 'lottehotel.koreacentral.cloudapp.azure.com',
      path: '/',
      port: '80',
    }
  });
  proxy.on('error', function (err) {
    console.log(err);
    next(err);
  });
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
