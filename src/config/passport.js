const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.use(new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  //match user's email
  const foundUser = await User.findOne({username: username});
  if(!foundUser) {
    return done(null, false, { message: 'User not found.' });
  } else {
    const match = await foundUser.matchPass(password);
    if(match) {
      return done(null, foundUser);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
  done(err, user);
  });
});
