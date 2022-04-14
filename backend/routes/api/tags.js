const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const { restoreUser } = require('../../utils/auth');

const csrfProtection = csurf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { Tag, Note } = require('../../db/models');

const router = express.Router();

router.get(
	'/:userId/:noteId',
	restoreUser,
	asyncHandler(async (req, res) => {
		const { userId, noteId } = req.params;
		const allTags = await Tag.findAll({
			where: {
				userId,
			},
		});
		const noteTags = await Tag.findAll({
			include: [
				{
					model: Note,
					as: 'NoteTags',
					where: {
						id: noteId,
					},
				},
			],
		});
		return res.json({ allTags, noteTags });
	})
);

router.post(
	'/',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { userId, name } = req.body;
		console.log(userId, name);
		const newTag = await Tag.create({
			name,
			userId,
		});
		return res.json(newTag);
	})
);

// router.put(
// 	'/:id',
// 	csrfProtection,
// 	asyncHandler(async (req, res) => {
// 		const { id, name, content, notebookId } = req.body;
// 		const note = await Note.findByPk(id);
// 		if (name === note.name && content === note.content && notebookId === note.notebookId) {
// 			return res.json({ message: 'no new changes' });
// 		}
// 		const newNote = await note.update({
// 			name,
// 			content,
// 			notebookId,
// 		});
// 		return res.json(newNote);
// 	})
// );

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

module.exports = router;
