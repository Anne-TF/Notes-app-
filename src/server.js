const express = require('express');
const app = express();
const path = require('path');
const bodyP = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require('./routes/ind.routes.js');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const expsessions = require('express-session');
const passport = require('passport');

// Initializers
app.use(bodyP.urlencoded({ extended : true }));

// Settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

//static files
app.use(express.static(path.join(__dirname, 'public')));
// Middlewares
app.use(methodOverride('_method'));
app.use(expsessions({
  secret: 'itsamothrfckingsecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js');
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes (imported)

app.use(require('./routes/ind.routes.js'));
app.use(require('./routes/notes.routes.js'));
app.use(require('./routes/users.routes.js'));

module.exports = app;
