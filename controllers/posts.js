const Post = require('../models/post');
const Account = require('../models/account');
const Comment = require('../models//comment');

module.exports = {
  index,
  create,
  new: newPost,
  delete: deletePost,
  show,
  update,
  edit
};

function index(req, res)
{
    Post.find({}, function(err, posts){
        if(err) throw err;
        res.render('posts/index', {posts: posts.reverse()});
    });
}

function show(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err) throw err;
        Comment.find({post: post._id}, function(err, comments){
            res.render('posts/show', {post, comments});
        });
    });
}

function edit(req, res){
    Post.findById(req.params.id, function(err, post){
        res.render('posts/edit', {post});
    });
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
        if(err) throw err;

        req.body.account = account;
        req.body.handle = account.handle;

        const newPost = new Post(req.body);
        newPost.save(function(err){
            if(err) return res.redirect('/posts');
            res.redirect('/posts');
        });
    });
}

function update(req, res){
    const newValues = {$set: {title: req.body.title, caption: req.body.caption}};
    Post.findByIdAndUpdate(req.params.id, newValues, function(err){
        if(err) throw err;
        res.redirect(`/accounts/${req.user.handle}`);
    });
}

function deletePost(req, res){
    Post.findByIdAndDelete(req.params.id, function(err){
        if(err) res.redirect(`/accounts/${req.user.handle}`);
        res.redirect(`/accounts/${req.user.handle}`);
    });
}
