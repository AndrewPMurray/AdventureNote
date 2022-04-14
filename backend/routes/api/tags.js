const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const { restoreUser } = require('../../utils/auth');

const csrfProtection = csurf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { Tag, Note, NoteTag } = require('../../db/models');

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

router.put(
	'/:id',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id, name, userId } = req.body;
		const tag = await Tag.findByPk(id);
		if (name === tag.name) {
			return res.json({ message: 'no new changes' });
		}
		const newTag = await tag.update({
			name,
			userId,
		});
		return res.json(newTag);
	})
);

router.delete(
	'/:id',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const tag = await Tag.findByPk(id);
		const noteTags = await NoteTag.findAll({
			where: {
				tagId: id,
			},
		});
		noteTags.forEach(async (noteTag) => {
			await noteTag.destroy();
		});
		await tag.destroy();
		return res.json({ message: 'success' });
	})
);

module.exports = router;
