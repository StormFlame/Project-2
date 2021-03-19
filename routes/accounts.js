var router = require('express').Router();
const passport = require('passport');
const accountCtrl = require('../controllers/accounts');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

// The root route renders our only view
router.get('/accounts', accountCtrl.index);
router.get('/accounts/:id', accountCtrl.show);
router.get('/accounts/:id/edit', accountCtrl.edit);

router.put('/accounts/:id', upload.single('avatar'), accountCtrl.update);
router.delete('/accounts/:id', accountCtrl.delete);

//Login Page
router.get('/checkUser', accountCtrl.checkUser);

router.get('/login', function(req, res){
    res.render('accounts/login');
  })

module.exports = router;