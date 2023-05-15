const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const logger = require('morgan')
require('dotenv').config()
const connectDb = require('./src/connection')
const router = require('./router')

const app = express()

// Middleware
app.use(express.json());
app.use(logger('dev'));
app.use('/', router)

app.get('/', (req, res) => {
    res.send('Welcome to the Multer Express MongoDB tutorial!');
  });

connectDb(app)