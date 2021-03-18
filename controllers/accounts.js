const Account = require('../models/account');
const Post = require('../models/post');
const Comment = require('../models/comment');
const post = require('../models/post');

module.exports = {
    index,
    show,
    delete: deleteAccount,
    checkUser,
    update,
    edit
};

function index(req, res){
    Account.find({}, function(err, accounts){
        if(err) throw err;
        res.render('accounts/index', {accounts});
    });
}

function edit(req, res){
    Account.findById(req.params.id, function(err, account){
        if(err) throw err;
        res.render('accounts/edit', {account});
    });
}

function update(req, res){
    Account.find({handle: req.body.handle}, function(err, account){
        if(err) throw err;
        if(account != ''){
            if(req.body.handle != req.user.handle){
            res.redirect(`/accounts/${req.body.handle}`);
            }else{
                Account.findByIdAndUpdate(req.user._id, {$set: {avatar: req.body.avatar}}, function(err){
                    if(err) throw err;
                    res.redirect(`/accounts/${req.body.handle}`);
                });
            }
        }else{
            const newValues = {$set: {handle: req.body.handle, avatar: req.body.avatar}}
            Account.findByIdAndUpdate(req.user._id, newValues, function(err){
                Post.updateMany({handle: req.user.handle}, {$set: {handle: req.body.handle}}, function(err){
                    Comment.updateMany({handle: req.user.handle}, {$set: {handle: req.body.handle}}, function(err){
                        res.redirect(`/accounts/${req.body.handle}`);
                    });
                });
            });
        }
    });
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
    Account.findOne({'handle': req.params.id}, function(err, account){
        if(err || account === null) return res.redirect('/posts');
        Post.find({account: account._id}, function(err, posts){
            Comment.find({account: account._id}, function(err, comments){
                res.render('accounts/show', {account, posts: posts.reverse(), comments: comments.reverse()});
            });
        });
    });
}

function deleteAccount(req, res){
    Account.findByIdAndDelete(req.params.id, function(err){
        Post.deleteMany({account: req.params.id}, function(err){
            Comment.deleteMany({account: req.params.id}, function(err){
                if(err) return res.redirect('/posts');
                res.redirect('/posts');
            });
        });
    });
}
