const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const { restoreUser } = require('../../utils/auth');

const csrfProtection = csurf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { Note, NoteTag, Tag } = require('../../db/models');

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
		const { userId, notebookId } = req.body;
		const newNote = await Note.create({
			name: null,
			content: null,
			userId,
			notebookId,
		});
		return res.json(newNote);
	})
);

router.post(
	'/:noteId/tags',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { noteId } = req.params;
		const { tagId } = req.body;
		const tag = await Tag.findByPk(tagId);
		const newNoteTag = await NoteTag.create({
			noteId,
			tagId,
		});
		return res.json(tag);
	})
);

router.put(
	'/:id',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id, name, content, notebookId } = req.body;
		const note = await Note.findByPk(id);
		if (name === note.name && content === note.content && notebookId === note.notebookId) {
			return res.json({ message: 'no new changes' });
		}
		const newNote = await note.update({
			name,
			content,
			notebookId,
		});
		return res.json(newNote);
	})
);

router.delete(
	'/:id',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const note = await Note.findByPk(id);
		await note.destroy();
		return res.json({ message: 'success' });
	})
);

router.delete(
	'/:noteId/tags/:tagId',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { noteId, tagId } = req.params;
		const noteTag = await NoteTag.findOne({
			where: {
				noteId,
				tagId,
			},
		});
		await noteTag.destroy();
		return res.json({ message: 'success' });
	})
);

module.exports = router;
