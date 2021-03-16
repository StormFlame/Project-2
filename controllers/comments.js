const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {
  create,
  delete: deleteComment
};

function create(req, res){
    console.log('CREATE NEW COMMENT');
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

function deleteComment(req, res){
    Comment.findByIdAndDelete(req.params.id, function(err){
        if(err) throw err;
        res.redirect('back');
    });
}
