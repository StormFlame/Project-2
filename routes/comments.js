var router = require('express').Router();
const passport = require('passport');
const commentsCtrl = require('../controllers/comments');

router.get('/comments/:id/edit', commentsCtrl.edit);

router.post('/posts/:id/comments', commentsCtrl.create);
router.put('/comments/:id', commentsCtrl.update);
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;