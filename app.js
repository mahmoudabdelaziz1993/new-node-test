var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var engine = require('ejs-mate');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var LocalStrategy =require('passport-local').Strategy;

var app = express();

const mongoose = require('mongoose');
const URL = 'mongodb://mahmoud:123mmm@ds133353.mlab.com:33353/passportapp';
//mongoose.promise = global.promise;
//-------------------------------------- connect to database ------------------
mongoose.connect(URL); 
require('./config/passport');
// view engine setup
app.engine('ejs',engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json
app.use(bodyParser.json());
app.use(session({
  secret:"asdkjashdkjhnsam,dbnmsahdkjshakfjhasdi;jflkdsajglkfkldsajglk",
  resave:true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);



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
