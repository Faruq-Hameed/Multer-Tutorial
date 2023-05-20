// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "username is required"],
//       unique: true,
//     },
//     password: { type: String, required: [true, "password is required"] },
//   },
//   { timestamps: true }
// );

// // Pre-save middleware to hash the password
// UserSchema.pre("save", function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }

//   bcrypt
//     .hash(user.password, 10)
//     .then((hashedPassword) => {
//       user.password = hashedPassword;
//       next();
//     })
//     .catch((err) => next(err));
// });
// // Method to compare passwords
// UserSchema.methods.comparePassword = async function (password) {
//     try {
//       const isMatch = await bcrypt.compare(password, this.password);
//       return isMatch;
//     } catch (err) {
//       throw err;
//     }
//   };

// // User model
// const User = mongoose.model("User", UserSchema);

// module.exports = User;

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
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// User model
const User = mongoose.model("User", UserSchema);

module.exports = User;

