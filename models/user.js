const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {
    type: String,
    unique: true,
  },
  password: String,
  account: {
    balance : Number,
    maxBalance : Number,
    reward: Number,
    maxReward: Number
  }
});

const User = mongoose.model('User', userSchema);
exports.User = User;