const express = require('express');
const {createUser,getAllUsers} = require('./src/controllers/users');

const router = express.Router()

router.post('/register', createUser)
router.get('/', getAllUsers)

module.exports = router