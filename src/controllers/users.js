const StatusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const User = require("../models/user");
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

/*controller for creating a new user**/
const createUser = async (req, res) => {
  const { username, password } = req.body; //extract data from request body

  // Check if the username already exists
  try {
    const userAlreadyExist = await User.findOne({ username }, "username");
    if (userAlreadyExist) {
      return res.status(StatusCodes.StatusCodes.CONFLICT).json({
        message: `username, ${userAlreadyExist.username} already exists`,
      });
    }

    await User.create({ ...req.body });
    res
      .status(StatusCodes.StatusCodes.OK)
      .json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error creating user: " + err.message);
    res
      .status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  User.find({})
    .limit(req.query.limit * 1) //if present. Multiply by 1 to avoid error(incase non integer value is passed)
    .then((users) => {
      res.status(StatusCodes.OK).json({ data: users });
    })
    .catch((err) => {
      res
        .status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", error: err });
    });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.default.UNAUTHORIZED)
        .json({
          error: `Authentication failed!. User with username ${username}  not found`,
        });
    }
    //compare the password if the username is found

    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch) {
      console.log({JWT_SIGNATURE})

      const token = jwt.sign({ userId: user._id}, JWT_SIGNATURE );
      res.status(200).json({ token });
    } else {
      res
        .status(StatusCodes.default.UNAUTHORIZED)
        .json({
          error: "Authentication failed. Incorrect password. Please try again",
        });
    }
  } catch (err) {
    res
      .status(StatusCodes.default.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports = { createUser, getAllUsers,login };
