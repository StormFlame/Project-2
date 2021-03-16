var router = require('express').Router();
const passport = require('passport');
const commentsCtrl = require('../controllers/comments');

// The root route renders our only view
router.post('/posts/:id/comments', commentsCtrl.create);
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;