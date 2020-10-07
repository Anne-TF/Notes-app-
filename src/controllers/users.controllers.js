const { Router } = require('express');
const router = Router();
const User = require('../models/user.js');
const passport = require('passport');

const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('register');
};

usersCtrl.SignUp = async (req, res) => {
  let errors = [];
  const { name, email, username, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({text: 'Passwords do not match.'});
  }
  if (password.length < 4) {
    errors.push({text: 'Password must be at least 4 characters long.'});
  }
  if(errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      username
    });
  } else {
    const compareEmail = await User.findOne({email: email});
      if(compareEmail) {
      errors.push({text: 'This email is already in use.'});
      res.render('register', {
        errors,
        name,
        username
      });
      } else {
        const compareUsername = await User.findOne({username: username});
          if(compareUsername) {
          errors.push({text: 'This username is already in use.'});
          res.render('register', {
            errors,
            name,
            email
          });
          } else {
        const newUser = new User({ name, email, username, password });
        newUser.password = await newUser.encryptPass(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered now!')
        res.redirect('/sign-in');
        }
      }
    }
};

usersCtrl.renderSignInForm= (req, res) => {
  res.render('sign-up');
};

usersCtrl.logIn = passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/sign-in',
  failureFlash: true
});

usersCtrl.logOut= (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out.')
  res.redirect('/sign-in');
};

module.exports = usersCtrl;
