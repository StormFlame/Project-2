var router = require('express').Router();
const passport = require('passport');
const accountCtrl = require('../controllers/accounts');

// The root route renders our only view
router.get('/accounts/:id', accountCtrl.show);


module.exports = router;