const { Router } = require('express');
const router = Router();
const notesCtrl = require('../controllers/notes.controllers.js');
const { isAuthenticated } = require('../helpers/validate.js');

router.get('/add', isAuthenticated, notesCtrl.renderNoteForm);

router.get('/notes', isAuthenticated, notesCtrl.renderAllNotes);

router.post('/add', isAuthenticated, notesCtrl.addnote);

router.get('/notes/edit/:id', isAuthenticated,  notesCtrl.renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, notesCtrl.edit);

router.delete('/notes/delete/:id', isAuthenticated, notesCtrl.delete);
module.exports = router;
