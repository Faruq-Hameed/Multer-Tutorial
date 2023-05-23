const multer = require("multer");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create a Multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only certain file types
    console.log({file})
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type")); // Reject the file
    }
  },
});
// Define the controller method to handle file upload
const uploadSingleFile = (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
  } else {
    res.status(200).json({ message: "File uploaded successfully" });
  }
};

//error handling middleware
const uploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer errors
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ error: "File size exceeds the limit" });
    } else if (err.message === "Invalid file type") {
      res.status(400).json({ error: "Invalid file type" });
    } else {
      res.status(400).json({ error: err.message });
    }
  } else {
    // Other errors
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { uploadSingleFile, upload, uploadError };
