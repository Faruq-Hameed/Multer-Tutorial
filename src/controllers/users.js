const { response } = require("express");
const User = require("../models/user");
const StatusCodes = require("http-status-codes");

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
  } 
  catch (err) {
    console.error("Error creating user: " + err.message);
    res
      .status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) =>{
    User.find({})
    .limit(req.query.limit * 1) //if present. Multiply by 1 to avoid error(incase non integer value is passed)
    .then(users => {
        res
        .status(StatusCodes.OK)
        .json({ data: users });
    })
    .catch(err => {
        res
      .status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: err });
    });
}


module.exports = {createUser, getAllUsers}