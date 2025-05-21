    const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const cloudinary = require("cloudinary").v2;
    const { CloudinaryStorage } = require("multer-storage-cloudinary");
    require('dotenv').config();



// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Add this for debugging
console.log("Cloudinary config check:", {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Not set",
    apiKey: process.env.CLOUDINARY_API_KEY ? "Set" : "Not set",
    apiSecret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Not set"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    allowed_formats: ["jpg", "jpeg", "png", "gif"]
    },
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } 
}).single('image');


router.post('/', (req, res) => {
    upload(req, res, async function(err) {
    // Handle multer and other initial errors
    if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: err.message });
    }
    
    // Check if file exists
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    try {
        // Return the cloudinary URL
        console.log("File uploaded successfully:", req.file);
        res.json({
        imageUrl: req.file.path,
        publicId: req.file.filename
        });
    } catch (error) {
        console.error("Error in upload route:", error);
        res.status(500).json({ error: 'Server error during image processing' });
    }
    });
});

module.exports = router;