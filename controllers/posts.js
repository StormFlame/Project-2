const Post = require('../models/post');
const Account = require('../models/account');

module.exports = {
  index,
  create,
  new: newPost,
  delete: deletePost
};

function index(req, res)
{
    if(req.user){
        Post.find({}, function(err, posts){
            res.render('posts/index', {posts});
        });
    }else{
        res.redirect('/login');
    }
}

function newPost(req, res){
    if(req.user){
        res.render('posts/new');
    }else{
        res.redirect('/login');
    }
}

function create(req, res){
    Account.findById(req.user._id, function(err, account){
        req.body.account = account;
        req.body.accountName = account.name;
        const newPost = new Post(req.body);
        newPost.save(function(err){
            if(err) return res.redirect('/posts');
            res.redirect('/posts');
        });
    });
}

function deletePost(req, res){
    Post.findByIdAndDelete(req.params.id, function(err){
        if(err) res.redirect(`/accounts/${req.user.name}`);
        res.redirect(`/accounts/${req.user.name}`);
    });
}
