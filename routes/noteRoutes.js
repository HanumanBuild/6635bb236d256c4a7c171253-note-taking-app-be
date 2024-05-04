const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
 try {
 const notes = await Note.find({ userId: req.user.userId });
 res.send(notes);
 } catch (error) {
 res.status(500).send(error);
 }
});

// Add new note
router.post('/', async (req, res) => {
 try {
 const { title, content } = req.body;
 const note = new Note({ userId: req.user.userId, title, content });
 await note.save();
 res.status(201).send(note);
 } catch (error) {
 res.status(400).send(error);
 }
});

// Update a note
router.put('/:id', async (req, res) => {
 try {
 const { title, content } = req.body;
 const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
 if (!note) {
 return res.status(404).send({ message: 'Note not found' });
 }
 res.send(note);
 } catch (error) {
 res.status(400).send(error);
 }
});

// Delete a note
router.delete('/:id', async (req, res) => {
 try {
 const note = await Note.findByIdAndDelete(req.params.id);
 if (!note) {
 return res.status(404).send({ message: 'Note not found' });
 }
 res.send({ message: 'Note deleted' });
 } catch (error) {
 res.status(400).send(error);
 }
});

module.exports = router;