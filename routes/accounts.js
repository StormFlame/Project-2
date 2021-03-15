var router = require('express').Router();
const passport = require('passport');
const accountCtrl = require('../controllers/accounts');

// The root route renders our only view
router.get('/accounts', accountCtrl.index);
router.get('/accounts/:id', accountCtrl.show);

router.put('/accounts/:id', accountCtrl.update);
router.delete('/accounts/:id', accountCtrl.delete);

//Login Page
router.get('/checkUser', accountCtrl.checkUser);

router.get('/login', function(req, res){
    res.render('accounts/login');
  })

module.exports = router;