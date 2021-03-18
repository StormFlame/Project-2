const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {
  create,
  delete: deleteComment,
  edit,
  update
};

function edit(req, res){
    Comment.findById(req.params.id, function(err, comment){
        res.render('comments/edit', {comment});
    });
}

function create(req, res){
    Post.findById(req.params.id, function(err, post){

        req.body.post = post._id;
        req.body.account = req.user._id;
        req.body.handle = req.user.handle;

        const newComment = new Comment(req.body);

        newComment.save(function(err){
            if(err) throw err;
            res.redirect(`/posts/${req.params.id}`);
        });
    });
}

function update(req, res){
    const newContent = {$set: {content: req.body.content}};
    Comment.findByIdAndUpdate(req.params.id, newContent, function(err, comment){
        if(err) throw err;
        res.redirect(`/posts/${comment.post}`);
    });
}

function deleteComment(req, res){
    Comment.findByIdAndDelete(req.params.id, function(err){
        if(err) throw err;
        res.redirect('back');
    });
}
