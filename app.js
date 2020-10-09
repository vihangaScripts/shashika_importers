var createError = require('http-errors');
var express = require('express');
var path = require('path');
fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

 hbs=require('express-handlebars');
 
  
 var spare_partsRouter = require('./routes/spare_parts');
 var usersRouter = require('./routes/users');
 var main_spare_partRouter = require('./routes/main_spare_part');
 var feed_Router=require('./routes/feed');
 var Spare_des=require('./routes/Spare_parts-Des');


const { extname } = require('path');
var app = express();

// view engine setup

const session = require('express-session'); 
const flash = require('connect-flash');


app.engine('hbs', hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.use('/', spare_partsRouter);
app.use('/users', usersRouter);
app.use('/main_spare_part',main_spare_partRouter);
app.use('/feed',feed_Router);
app.use('/get_part',Spare_des);

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
