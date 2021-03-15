const Account = require('../models/account');

module.exports = {
  index
};

function index(req, res)
{
    if(req.user){
        res.render('posts/index');
    }else{
        res.redirect('/login');
    }
}
