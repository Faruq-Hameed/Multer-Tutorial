const StatusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");
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
    const { email, password } = req.body;
    const user = await User.find({ email });
    if (!user) {
      return res
        .status(StatusCodes.default.UNAUTHORIZED)
        .json({
          error: `Authentication failed!. User with email ${email}  not found`,
        });
    }
    //compare the password if the email is found
    const isPasswordMatch = user.comparePassword(password);
    if (isPasswordMatch) {
      const token = jwt.sign({ userId: user._id, JWT_SIGNATURE });
      res.status(200).json({ token });
    } else {
      res
        .status(StatusCodes.default.UNAUTHORIZED)
        .json({
          error: "Authentication failed. Incorrect password. Please try again",
        });
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(StatusCodes.default.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports = { createUser, getAllUsers,login };
