const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'path/to/your/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Use the upload middleware in your route handlers
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the file upload
});
