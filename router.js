const express = require('express');
const {createUser} = require('./src/controllers/users');

const router = express.Router()

router.post('/register', createUser)


module.exports = router