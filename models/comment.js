const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
  
    handle: String,

    time: {
        type: Date,
        default: function(){
            const now = new Date()
            return now.setFullYear(now.getFullYear());
        }
    },

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