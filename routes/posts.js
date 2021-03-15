var router = require('express').Router();
const passport = require('passport');
const postCtrl = require('../controllers/posts');

// The root route renders our only view
router.get('/posts', postCtrl.index);


module.exports = router;