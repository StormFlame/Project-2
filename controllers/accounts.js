const Account = require('../models/account');
const Post = require('../models/post');

module.exports = {
    index,
    show,
    delete: deleteAccount
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
                res.render('accounts/show', {account, posts});
            });
        });
    }else{
        res.redirect('/login');
    }
}

function deleteAccount(req, res){
    Account.findByIdAndDelete(req.params.id, function(err){
        Post.deleteMany({account: req.params.id}, function(err){
            if(err) return res.redirect('/posts');
            res.redirect('/posts');
        });
    });
}
