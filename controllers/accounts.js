const Account = require('../models/account');

module.exports = {
    index,
    show
};

function index(req, res){

    if(req.user){
        Account.find({}, function(err, accounts){
            res.render('accounts/index', {accounts});
        });
    }else{
        res.redirect('/login');
    }
}

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
