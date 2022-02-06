const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');

const csrfProtection = csurf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { Note } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const notes = await Note.findAll();
		return res.json(notes);
	})
);

router.post(
	'/',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const userId = req.body.userId;
		const newNote = await Note.create({
			name: 'Untitled',
			content: '',
			userId,
			notebookId: null,
		});
		return res.json(newNote);
	})
);

module.exports = router;
