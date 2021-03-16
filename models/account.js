const mongoose = require('mongoose');

// Create your User Model
const accountSchema = new mongoose.Schema({
    name: String,
    email: String,

    avatar: {
      type: String,
      default: 'https://i.imgur.com/kdRUrWH.jpg'
    },

    handle:{
      type: String,
      default: ''
    },

    googleId: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Account', accountSchema);