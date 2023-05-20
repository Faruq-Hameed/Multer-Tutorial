const express = require('express');
const {createUser,getAllUsers,login} = require('./src/controllers/users');

const router = express.Router()

router.post('/register', createUser)
router.post('/login', login)

router.get('/', getAllUsers)

module.exports = router