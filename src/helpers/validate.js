const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You are not authorized. Please log in first.')
  res.redirect('/sign-in')
}

module.exports = helpers;
