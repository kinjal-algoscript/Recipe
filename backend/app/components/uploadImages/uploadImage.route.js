const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const uploadMiddleware = require('../../middleware/uploadMiddleware');

router.post('/upload', uploadMiddleware, (req, res) => {
    // Handle the uploaded files
    const files = req.files;
    // Process and store the files as required
    // For example, save the files to a specific directory using fs module
    files.forEach((file) => {
      const filePath = `uploads/${file.filename}`;
      fs.rename(file.path, filePath, (err) => {
        if (err) {
          // Handle error appropriately and send an error response
          return res.status(500).json({ error: 'Failed to store the file' });
        }
      });
    });
  
    // Send an appropriate response to the client
    res.status(200).json({ message: 'File upload successful' });
  });


module.exports = router;
