const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');

const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');

const csrfProtection = csurf({ cookie: true });

const { Notebook, Note } = require('../../db/models');

const router = express.Router();

const validateNotebook = [
	check('title')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a title for your notebook')
		.isLength({ min: 1 })
		.withMessage('Please provide a title for your notebook'),
	handleValidationErrors,
];

router.get(
	'/',
	restoreUser,
	asyncHandler(async (req, res) => {
		const { user } = req;
		const notebooks = await Notebook.findAll({
			where: {
				userId: user.id,
			},
		});
		return res.json(notebooks);
	})
);

router.post(
	'/',
	csrfProtection,
	validateNotebook,
	asyncHandler(async (req, res) => {
		console.log('boop!');
		const { title, userId } = req.body;
		const newNotebook = await Notebook.create({
			title,
			userId,
		});
		return res.json(newNotebook);
	})
);

router.put(
	'/:id',
	csrfProtection,
	validateNotebook,
	asyncHandler(async (req, res) => {
		const { title, notebookId } = req.body;
		const notebook = await Notebook.findByPk(notebookId);
		const editedNotebook = await notebook.update({ title });
		return res.json(editedNotebook);
	})
);

router.delete(
	'/:id',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const notebook = await Notebook.findByPk(id);
		const notebookNotes = await Note.findAll({ where: { notebookId: id } });
		notebookNotes.forEach(async (note) => await note.destroy());
		await notebook.destroy();
		return res.json({ message: 'success' });
	})
);

module.exports = router;
