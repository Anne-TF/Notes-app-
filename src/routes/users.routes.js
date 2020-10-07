const { Router } = require('express');
const router = Router();
const usersCtrl = require('../controllers/users.controllers.js');

router.get('/sign-up', usersCtrl.renderSignUpForm);

router.get('/sign-in', usersCtrl.renderSignInForm);

router.post('/sign-up', usersCtrl.SignUp);

router.post('/login', usersCtrl.logIn);

router.get('/logout', usersCtrl.logOut);

module.exports = router;
