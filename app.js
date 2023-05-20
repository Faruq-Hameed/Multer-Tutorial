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
  
  // Set up multer storage and file filter
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Use the upload middleware for handling file uploads
  app.post("/upload", upload.single("file"), (req, res) => {
    // Handle the uploaded file
    console.log(req.file);
    res.send("File uploaded successfully.");
  });


//middleware to handle unknown routes requests  
app.get('*', (req, res) => {
    res.status(404).send('unknown url')
})
connectDb(app)