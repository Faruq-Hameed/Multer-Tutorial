const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
  },
  { timestamps: true }
);

  // User model
const User = mongoose.model('User', UserSchema);

module.exports = User;