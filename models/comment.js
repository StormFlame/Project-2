const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
  
    handle: String,

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Comment', commentSchema);