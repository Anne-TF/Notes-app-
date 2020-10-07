const { Router } = require('express');
const router = Router();
const Note = require('../models/notes.js');

const notesCtrl = {};

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes.form.hbs');
};

notesCtrl.addnote = async (req, res) => {
  const {title, description} = req.body;
  const newNote = new Note({title, description});
  newNote.user = req.user.id;
  await newNote.save();
  req.flash('success_msg', 'Note added successfully');
  res.redirect('/notes');
};

notesCtrl.renderAllNotes = async (req, res) => {
  const notes = await Note.find({user : req.user.id}).lean().sort({createdAt: -1});
  res.render('all_notes', { notes })
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await  Note.findById(req.params.id).lean();
  if(note.user != req.user.id) {
    req.flash('error', 'You are not authorized to do that.');
    res.redirect('/notes');
  }
  res.render('editform', { note });
};

notesCtrl.edit = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Note updated successfully');
  res.redirect('/notes');
};

notesCtrl.delete = async (req, res) => {
  const note = await  Note.findById(req.params.id)
  await Note.findByIdAndDelete(req.params.id);
  if(note.user != req.user.id) {
    req.flash('error', 'You are not authorized to do that.');
    res.redirect('/notes');
  };
  req.flash('success_msg', 'Note deleted succesfully');
  res.redirect('/notes');
};

module.exports = notesCtrl;
