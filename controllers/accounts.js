const { db } = require('../models/account');
const Account = require('../models/account');
const Post = require('../models/post');

module.exports = {
    index,
    show,
    delete: deleteAccount,
    checkUser,
    update
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

function update(req, res){
    const newValues = {$set: {handle: req.body.handle, avatar: req.body.avatar}};
    Account.findByIdAndUpdate(req.params.id, newValues, function(err, response){
        if(err) throw err
        console.log(response);
        db.close();
    });

    res.redirect('/posts');
}

function checkUser(req, res){

    console.log(req.user.handle, req.user.avatar);

    if(req.user.handle == ''){
        console.log('New account');
        res.render('accounts/new')
    }else{
        console.log('now new account');
        res.redirect('/posts');
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
