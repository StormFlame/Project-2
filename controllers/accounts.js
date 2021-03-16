const { render } = require('ejs');
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
            if(err) throw err;
            res.render('accounts/index', {accounts});
        });
    }else{
        res.redirect('/login');
    }
}

function update(req, res){
    Account.findOne({handle: req.body.handle}, function(err, account){
        if(err) throw err;
        if(account) req.body.handle += '123';
        const newValues = {$set: {handle: req.body.handle, avatar: req.body.avatar === '' ? req.user.avatar : req.body.avatar}};
        Account.findByIdAndUpdate(req.params.id, newValues, function(err, response){
            if(err) throw err
            console.log(response);
        });
    });

    res.redirect('/posts');
}

function checkUser(req, res){

    if(req.user.handle == ''){
        res.render('accounts/new', {message: ''})
    }else{
        res.redirect('/posts');
    }
}

function show(req, res)
{
    if(req.user){
        Account.findOne({'handle': req.params.id}, function(err, account){
            if(err || account === null) return res.redirect('/posts');
            Post.find({account: account._id}, function(err, posts){
                res.render('accounts/show', {account, posts: posts.reverse()});
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
