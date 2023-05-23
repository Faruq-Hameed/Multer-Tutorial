const fs = require('fs')
const path = require('path')
// const mime = require('mime');

// Example route for serving images
const getImage = async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'uploads', filename);
  
    // Check if the image exists
    if (fs.existsSync(imagePath)) {
      // Send the image as the response
      res.sendFile(imagePath);
    } else {
      // Image not found
      res.status(404).json({ error: 'Image not found' });
    }
  };

  // Retrieve all pictures
// const getAllImages =  async(req, res) => {
//     const fs = require('fs');
//     const directoryPath = 'uploads/';
  
//     fs.readdir(directoryPath, (err, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.status(200).json({ pictures: files });
//       }
//     });
//   };

  // Retrieve all pictures
//   const getAllImages =  async (req, res) => {
//     const directory = 'uploads/';
  
//     fs.readdir(directory, (err, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Internal server error' });
//       } else {
//         const images = files.filter((file) => {
//           const mimeType = mime.getType(file);
//           return mimeType && mimeType.startsWith('image/');
//         });
  
//         res.json({ images });
//       }
//     });
//   };

// Retrieve all pictures
// const getAllImages =  async  (req, res) => {
//   const directory = 'uploads/';

//   fs.readdir(directory, (err, files) => {
//     if (err) {
//       res.status(500).json({ error: 'Internal server error' });
//     } else {
//       const images = files.filter((file) => {
//         const extension = path.extname(file).toLowerCase();
//         return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
//       });

//       res.json({ images });
//     }
//   });
// };

const mime = require('mime');

// Get all pictures route
const getAllImages =  async  (req, res) => {
    try {
        const pictures = fs.readdirSync('uploads/');
        pictures.forEach((filename) => {
          const filePath = path.join('uploads/', filename);
          const fileStream = fs.createReadStream(filePath);
          const contentType = mime.getType(filePath);
    
          res.set({
            'Content-Disposition': `inline; filename="${filename}"`,
            'Content-Type': contentType,
          });
    
          fileStream.pipe(res);
        });
      } catch (error) {
        console.error('Get pictures error:', error);
        res.status(500).json({ message: 'Failed to retrieve pictures' });
      }
  };


module.exports = {getImage,getAllImages}

 
