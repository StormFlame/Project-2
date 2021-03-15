var router = require('express').Router();
const passport = require('passport');
const postCtrl = require('../controllers/posts');

// The root route renders our only view
router.get('/posts', postCtrl.index);
router.get('/posts/new', postCtrl.new);
router.post('/posts', postCtrl.create);
router.delete('/posts/:id', postCtrl.delete);


module.exports = router;