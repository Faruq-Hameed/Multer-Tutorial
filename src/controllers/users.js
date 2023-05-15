const User = require('../models/user');
const StatusCodes = require('http-status-codes')

const createUser = async (req, res) => {
    const {username, password} = req.body;  //extract data from request body
     
    // Check if the username already exists
    const userAlreadyExist = await User.findOne({username}, 'username')
    if(userAlreadyExist){
        return res
        .status(StatusCodes.CONFLICT)
        .json({message: `username, ${userAlreadyExist.username} already exists`})
    }

}