const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = require('express').Router();

router.post('/test', (req, res) => {
	res.json({ requestBody: req.body });
});

module.exports = router;
