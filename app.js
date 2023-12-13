var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors'); // CORS ERROR 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// *** STEP 1
var movies = require('./routes/movies');
var foot = require('./routes/football');
// ***

//
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
var certificate = fs.readFileSync('selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
//

var app = express();

//
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(8080);
httpsServer.listen(8443);
//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors()); // CORS ERROR 

app.use('/', indexRouter);
app.use('/users', usersRouter);
// *** STEP 2
app.use('/api/movies', movies);
app.use('/api/foot', foot);
// ***

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
