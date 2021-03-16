const Post = require('../models/post');
const Account = require('../models/account');
const Comment = require('../models//comment');

module.exports = {
  index,
  create,
  new: newPost,
  delete: deletePost,
  show,
  update
};

function index(req, res)
{
    if(req.user){
        Post.find({}, function(err, posts){
            if(err) throw err;
            res.render('posts/index', {posts: posts.reverse()});
        });
    }else{
        res.redirect('/login');
    }
}

function show(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err) throw err;
        Comment.find({post: post._id}, function(err, comments){
            res.render('posts/show', {post, comments});
        });
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

}

function deletePost(req, res){
    Post.findByIdAndDelete(req.params.id, function(err){
        if(err) res.redirect(`/accounts/${req.user.handle}`);
        res.redirect(`/accounts/${req.user.handle}`);
    });
}
