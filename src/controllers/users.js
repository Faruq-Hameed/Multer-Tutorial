const { response } = require("express");
const User = require("../models/user");
const StatusCodes = require("http-status-codes");

const createUser = async (req, res) => {
  const { username, password } = req.body; //extract data from request body

  // Check if the username already exists
  try {
    const userAlreadyExist = await User.findOne({ username }, "username");
    if (userAlreadyExist) {
      return res.status(StatusCodes.CONFLICT).json({
        message: `username, ${userAlreadyExist.username} already exists`,
      });
    }

    await User.create({ ...req.body }).then(() => {
      res
        .status(StatusCodes.OK)
        .json({ message: "User registered successfully" });
    });
  } 
  catch (err) {
    console.error("Error creating user: " + err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) =>{
    User.findOne({})
    .then(users => {
        res
        .status(StatusCodes.OK)
        .json({ allUsers: users });
    })
    .catch(err => {
        res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: err });
    });
}


module.exports = {createUser, getAllUsers}