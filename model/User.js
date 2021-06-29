const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  profile: {
    firstName:{ type: String , required: true },
    lastName:{type:String, required: true},
    email: {type: String,equired: true,unique:true},
    phone: {type: String,equired: true},
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  lastLoginAt: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
