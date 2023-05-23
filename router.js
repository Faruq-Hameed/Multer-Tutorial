const express = require('express');
const {createUser,getAllUsers,login} = require('./src/controllers/users');
const getImage = require('./src/controllers/getImage');

const {uploadSingleFile, upload,uploadError} = require('./src/controllers/upload');
const router = express.Router()

router.post('/register', createUser)
router.post('/login', login)
router.post('/upload', upload.single('file'), uploadSingleFile,uploadError);
router.get('/images/:filename', getImage)
router.get('/', getAllUsers)

module.exports = router