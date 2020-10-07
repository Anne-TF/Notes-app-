const { Router } = require('express');
const router = Router();
const indexCtrl = require('../controllers/index.controllers.js');
const usersCtrl = require('../controllers/users.controllers.js');

router.get('/', indexCtrl.renderIndex);

router.get('/about', indexCtrl.renderAbout);

module.exports = router;
