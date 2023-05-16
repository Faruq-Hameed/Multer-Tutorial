const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

// Pre-save middleware to hash the password
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt
    .hash(user.password, 10)
    .then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    })
    .catch((err) => next(err));
});
// Method to compare passwords
UserSchema.methods.comparePassword = async function (user) {
  const isMatch = await bcrypt.compare(user, this.password);
  return isMatch;
};

// User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
