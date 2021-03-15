const Account = require('../models/account');
const Post = require('../models/post');

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
            Post.find({account: account._id}, function(err, posts){
                console.log(account);
                res.render('accounts/show', {account, posts});
            });
        });
    }else{
        res.redirect('/login');
    }
}
