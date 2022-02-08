const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');

const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');

const csrfProtection = csurf({ cookie: true });

const { Notebook } = require('../../db/models');

const router = express.Router();

const validateNotebook = [
	check('title')
		.exists({ checkFalsy: true })
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
		const { title, userId } = req.body;
		console.log(title, userId);
		const newNotebook = await Notebook.create({
			title,
			userId,
		});
		return res.json(newNotebook);
	})
);

module.exports = router;
