const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    caption: String,

    handle: String,

    comments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
  }],

    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Post', postSchema);