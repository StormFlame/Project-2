const mongoose = require('mongoose');

// Create your User Model
const accountSchema = new mongoose.Schema({
    name: String,
    email: String,

    avatar: String,

    handle:{
      type: String,
      default: ''
    },

    googleId: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Account', accountSchema);