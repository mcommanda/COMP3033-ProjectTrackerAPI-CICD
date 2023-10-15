var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Configure DB Connectivity
//var mongoose = require("mongoose");
//var configs = require("./config/globals");
// Configure DB connectivity
var mongoose = require("mongoose");
var configs = require('./config/globals');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/api/projects');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use("/api/projects", projectsRouter);

// Connect to DB after router/controller configuration
//mongoose
//.connect(configs.db, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//})
//.then((message) => {
//  console.log("App connected successfully!");
//})
//.catch((error) => {
//  console.log("Error while connecting: " + error);
//});
// Connect to DB after router/controller configuration
mongoose
  .connect(configs.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((message) => {
    console.log("App connected successfully!");
  })
  .catch((error) => {
    console.log("Error while connecting: " + error);
  });

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
