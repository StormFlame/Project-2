const Account = require('../models/account');

module.exports = {
  show
};

function show(req, res)
{
    if(req.user){
        Account.findOne({'name': req.params.id}, function(err, account){
            console.log(account);
            res.render('accounts/show', {account});
        });
    }else{
        res.redirect('/login');
    }
}
