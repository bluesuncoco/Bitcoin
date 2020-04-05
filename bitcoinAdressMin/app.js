var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

Promise = require("bluebird");
Promise.config({cancellation:true});

var util = require('util');
var log_stdout = process.stdout;
var log_file;

Configuration = require('./config/basicConfig.json');
require('./commonUtils/mylog.js')(Configuration);


var logger = require('morgan');

logger.token('requestParameters', function(req, res){
	return JSON.stringify(req.query) || '-';
});

logger.token('requestBody', function(req, res){
	return JSON.stringify(req.body) || '-';
});

logger.token('myDate', function(req, res){

	var s = new Date().toLocaleString('en-UK')
	return s;
});


// create custom format，includes the custom token
logger.format('live-api', ':myDate   :date[clf]\n:method :url :status :requestParameters ');

var app = express();



	// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('live-api'));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var walletRouter = require('./routes/hdWallet.js');
app.use('/hdWallet', walletRouter);

var addressRouter = require('./routes/MultiSigAddress.js');
app.use('/btc-address', addressRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log(req.app.get('env'));
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
