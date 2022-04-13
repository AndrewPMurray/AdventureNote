const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notesRouter = require('./notes.js');
const notebooksRouter = require('./notebooks.js');
const tagsRouter = require('./tags.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notes', notesRouter);
router.use('/notebooks', notebooksRouter);
router.use('/tags', tagsRouter);

module.exports = router;
