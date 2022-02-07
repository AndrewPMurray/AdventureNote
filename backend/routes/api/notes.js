const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const { restoreUser } = require('../../utils/auth');

const csrfProtection = csurf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { Note } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	restoreUser,
	asyncHandler(async (req, res) => {
		const { user } = req;
		const notes = await Note.findAll({
			where: {
				userId: user.id,
			},
		});
		return res.json(notes);
	})
);

router.post(
	'/',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const userId = req.body.userId;
		const newNote = await Note.create({
			name: null,
			content: null,
			userId,
			notebookId: null,
		});
		return res.json(newNote);
	})
);

router.put(
	'/',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { noteId, name, content } = req.body;
		const note = await Note.findOne({ where: { id: noteId } });
		const newNote = await note.update({
			name,
			content,
		});
		return res.json(newNote);
	})
);

router.delete(
	'/',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const note = await Note.findByPk(id);
		const deletedNote = await note.destroy();
		return res.json({ message: 'success' });
	})
);

module.exports = router;
