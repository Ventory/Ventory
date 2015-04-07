
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes
var routes = require('./routes/index');
var users = require('./routes/users');

// Additional Middleware
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var passportLocal = require('passport-local');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(expressSession);

var swig = require('swig');
var bcrypt = require('bcrypt');


var app = express();

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Mongoose Connection
// Mongoose Dev
if (app.get('env') == 'development') {
    mongoose.connect('mongodb://localhost/ventorydb');

    //Debug / Status info. All of this could be deleted without loss of functionality
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function(callback) {
        // console.log('Database connection established');
    });
}


// Middleware .use()
app.use(expressSession({
    secret: 'RdcGqqOQwCB2N17JSL209DD6j5LX48nj',
    cooke: { maxAge: new Date(Date.now() + 3600000)},
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Setup
passport.use(new passportLocal.Strategy( function(username, password, done) {
    mongoose.model('users').findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: '<b>Error</b> Incorrect username / password' });
      }
      user.validPassword(password, function passwordResponse(isCorrect) {
        if (!isCorrect) {
            return done(null, false, { message: '<b>Error</b> Incorrect username / password'});
        } else {
            return done(null, user);
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  mongoose.model('users').findById(id, function(err, user) {
    done(err, user);
  });
});


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
