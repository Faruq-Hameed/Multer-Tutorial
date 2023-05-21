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
  
//middleware to handle unknown routes requests  
app.get('*', (req, res) => {
    res.status(404).send('unknown url')
})
connectDb(app)