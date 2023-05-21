const express = require('express');
const {createUser,getAllUsers,login} = require('./src/controllers/users');
const {uploadSingleFile, upload,uploadError} = require('./src/controllers/upload');
const router = express.Router()

router.post('/register', createUser)
router.post('/login', login)
router.post('/upload', upload.single('file'), uploadSingleFile,uploadError);

router.get('/', getAllUsers)

module.exports = router