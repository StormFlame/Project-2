var router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res, next){
  res.redirect('/posts');
});

//Login Page
router.get('/login', function(req, res){
  res.render('login');
})

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/posts', // where do you want the client to go after you login 
    failureRedirect : 'landing' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/posts');
});

module.exports = router;