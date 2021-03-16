var router = require('express').Router();
const passport = require('passport');
const postCtrl = require('../controllers/posts');
const post = require('../models/post');

// The root route renders our only view
router.get('/posts', postCtrl.index);
router.get('/posts/new', postCtrl.new);
router.get('/posts/:id', postCtrl.show);

router.put('/posts/:id', postCtrl.update);

router.post('/posts', postCtrl.create);

router.delete('/posts/:id', postCtrl.delete);


module.exports = router;