const fs = require('fs')
const path = require('path')
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

module.exports = getImage

 
