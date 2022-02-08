const express = require('express');
const asyncHandler = require('express-async-handler');
const csurf = require('csurf');
const { restoreUser } = require('../../utils/auth');

const csrfProtection = csurf({ cookie: true });

const { Notebook } = require('../../db/models');

const router = express.Router();

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

module.exports = router;
