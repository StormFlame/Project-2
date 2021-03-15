const mongoose = require('mongoose');

// Create your User Model
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    caption: String,

    accountName: String,

    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Post', postSchema);